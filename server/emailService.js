import nodemailer from 'nodemailer';
import dns from 'dns';

// Prefer IPv4 so smtp.gmail.com does not resolve to unreachable IPv6 on Render/hosting.
dns.setDefaultResultOrder('ipv4first');

const PLACEHOLDER_PATTERNS = [
  /your_gmail/i,
  /your_16_digit/i,
  /app_password/i,
  /example\.com/i,
  /changeme/i,
  /placeholder/i,
  /replace_with/i,
  /^xxxx/i
];

function looksLikePlaceholder(value = '') {
  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(String(value)));
}

export function isEmailConfigured() {
  if (process.env.ELASTIC_EMAIL_API_KEY) return true;
  if (process.env.RESEND_API_KEY) return true;

  const user = (process.env.EMAIL_USER || '').trim();
  const pass = (process.env.EMAIL_PASS || '').trim();

  if (!user || !pass) return false;
  if (looksLikePlaceholder(user) || looksLikePlaceholder(pass)) return false;

  // Gmail app passwords are 16 chars (often stored with spaces).
  const compactPass = pass.replace(/\s+/g, '');
  if (user.endsWith('@gmail.com') && compactPass.length < 10) return false;

  return true;
}

function buildTransportOptions() {
  const user = (process.env.EMAIL_USER || '').trim();
  // Gmail app passwords may be pasted with spaces — strip them.
  const pass = (process.env.EMAIL_PASS || '').trim().replace(/\s+/g, '');

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  return {
    host,
    port,
    secure,
    requireTLS: !secure,
    family: 4, // force IPv4 sockets (fixes ENETUNREACH on many PaaS hosts)
    auth: { user, pass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
    tls: {
      minVersion: 'TLSv1.2',
      // Gmail certs are valid; keep verification on unless explicitly disabled.
      rejectUnauthorized: process.env.SMTP_TLS_INSECURE === 'true' ? false : true
    }
  };
}

let transporter = null;

export function getTransporter() {
  if (!isEmailConfigured()) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport(buildTransportOptions());
  }

  return transporter;
}

/** Reset cached transporter (e.g. after env change in tests). */
export function resetTransporter() {
  transporter = null;
}

/**
 * Verify SMTP credentials/connectivity at startup.
 * Returns { ok, reason, detail? }
 */
export async function verifyEmailConnection() {
  if (process.env.ELASTIC_EMAIL_API_KEY) {
    return { ok: true, reason: 'Elastic Email HTTP API configured' };
  }

  if (process.env.RESEND_API_KEY) {
    return { ok: true, reason: 'Resend HTTP API configured' };
  }

  if (!isEmailConfigured()) {
    const user = process.env.EMAIL_USER || '';
    const pass = process.env.EMAIL_PASS || '';
    let reason = 'EMAIL_USER / EMAIL_PASS not set';

    if (user && pass && (looksLikePlaceholder(user) || looksLikePlaceholder(pass))) {
      reason =
        'EMAIL_USER / EMAIL_PASS still contain placeholder values. Set a real Gmail address and a 16-character App Password in production env vars.';
    } else if (!user || !pass) {
      reason = 'EMAIL_USER or EMAIL_PASS is missing from environment variables.';
    }

    return { ok: false, reason };
  }

  const transport = getTransporter();
  try {
    await transport.verify();
    return {
      ok: true,
      reason: `SMTP ready via ${transport.options.host}:${transport.options.port} as ${process.env.EMAIL_USER}`
    };
  } catch (err) {
    // If the default port 587 failed, and SMTP_PORT was not explicitly configured in env,
    // let's try port 465 (SSL) as a fallback.
    if (!process.env.SMTP_PORT && transport.options.port === 587) {
      console.log('SMTP port 587 verification failed. Trying fallback to port 465 (SSL)...');
      resetTransporter();

      const fallbackOptions = buildTransportOptions();
      fallbackOptions.port = 465;
      fallbackOptions.secure = true;
      fallbackOptions.requireTLS = false;

      const fallbackTransport = nodemailer.createTransport(fallbackOptions);
      try {
        await fallbackTransport.verify();
        // Cache the successful transporter so sendEmail uses it
        transporter = fallbackTransport;
        return {
          ok: true,
          reason: `SMTP ready via ${fallbackOptions.host}:${fallbackOptions.port} (SSL fallback) as ${process.env.EMAIL_USER}`
        };
      } catch (fallbackErr) {
        // If both failed, reset back to default
        resetTransporter();
        return {
          ok: false,
          reason: 'SMTP verification failed (both 587 and 465)',
          detail: `Port 587 error: ${err.message}. Port 465 error: ${fallbackErr.message}`,
          code: fallbackErr.code
        };
      }
    }

    return {
      ok: false,
      reason: 'SMTP verification failed',
      detail: err.message,
      code: err.code
    };
  }
}

/**
 * Send an email. Never throws — returns { success, error? }.
 * Application flow should keep succeeding even if mail fails.
 */
export async function sendEmail({ to, subject, html, attachments = [] }) {
  // Try Elastic Email HTTP API if ELASTIC_EMAIL_API_KEY is configured
  if (process.env.ELASTIC_EMAIL_API_KEY) {
    try {
      const formattedAttachments = attachments.map(att => ({
        Name: att.filename,
        ContentType: att.contentType || 'application/pdf',
        Content: Buffer.isBuffer(att.content) ? att.content.toString('base64') : Buffer.from(att.content || '').toString('base64')
      }));

      // EMAIL_FROM must be set in Render env vars e.g: Malkala Hostel <noreply@malkalahostel.com>
      // EMAIL_USER is also acceptable if it is your verified Elastic Email sender address.
      const fromAddress = (process.env.EMAIL_FROM || process.env.EMAIL_USER || '').trim();
      if (!fromAddress) {
        const msg = 'Elastic Email: EMAIL_FROM (or EMAIL_USER) env var is not set — cannot send.';
        console.error(msg);
        return { success: false, error: msg };
      }

      const payload = {
        Recipients: {
          To: [to]
        },
        Content: {
          From: fromAddress,
          Subject: subject,
          Body: [
            {
              ContentType: 'HTML',
              Charset: 'utf-8',
              Content: html || '<p>Your application has been received.</p>'
            }
          ]
        }
      };

      if (formattedAttachments.length > 0) {
        payload.Content.Attachments = formattedAttachments;
      }

      // Debug log — remove once confirmed working
      console.log('Elastic Email payload (without attachment content):', JSON.stringify({
        ...payload,
        Content: {
          ...payload.Content,
          Attachments: payload.Content.Attachments?.map(a => ({ Name: a.Name, ContentType: a.ContentType, ContentLength: a.Content?.length }))
        }
      }));

      const res = await fetch('https://api.elasticemail.com/v4/emails/transactional', {
        method: 'POST',
        headers: {
          'X-ElasticEmail-ApiKey': process.env.ELASTIC_EMAIL_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        console.log(`Email sent via Elastic Email API to ${to} — transactionId=${data.TransactionID || data.MessageID}`);
        return { success: true, messageId: data.TransactionID || data.MessageID };
      } else {
        console.error('Elastic Email API error response:', JSON.stringify(data));
        throw new Error(data.Error || data.message || JSON.stringify(data));
      }
    } catch (err) {
      console.error('Elastic Email API failed to send:', err.message);
      return { success: false, error: err.message };
    }
  }


  // Try Resend HTTP API if RESEND_API_KEY is configured
  if (process.env.RESEND_API_KEY) {
    try {
      const formattedAttachments = attachments.map(att => ({
        filename: att.filename,
        content: Buffer.isBuffer(att.content) ? att.content.toString('base64') : att.content
      }));

      const fromAddress = process.env.EMAIL_FROM || 'Malkala Hostel <onboarding@resend.dev>';

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [to],
          subject,
          html,
          attachments: formattedAttachments
        })
      });

      const data = await res.json();
      if (res.ok) {
        console.log(`Email sent via Resend API to ${to} — id=${data.id}`);
        return { success: true, messageId: data.id };
      } else {
        throw new Error(data.message || JSON.stringify(data));
      }
    } catch (err) {
      console.error('Resend API failed to send:', err.message);
      return { success: false, error: err.message };
    }
  }

  if (!isEmailConfigured()) {
    const msg = 'Email skipped: Neither Resend API Key nor SMTP user/password is configured.';
    console.error(msg);
    return { success: false, error: msg };
  }

  const transport = getTransporter();
  const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  try {
    const info = await transport.sendMail({
      from: `"Malkala Hostel" <${fromAddress}>`,
      to,
      subject,
      html,
      attachments
    });

    console.log(`Email sent to ${to} — messageId=${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('Email failed to send:', {
      to,
      subject,
      code: err.code,
      command: err.command,
      response: err.response,
      message: err.message
    });
    return { success: false, error: err.message, code: err.code };
  }
}
