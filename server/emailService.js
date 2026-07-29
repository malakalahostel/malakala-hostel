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
      reason: `SMTP ready via ${process.env.SMTP_HOST || 'smtp.gmail.com'}:${process.env.SMTP_PORT || 587} as ${process.env.EMAIL_USER}`
    };
  } catch (err) {
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
  if (!isEmailConfigured()) {
    const msg = 'Email skipped: SMTP is not configured (missing or placeholder EMAIL_USER/EMAIL_PASS).';
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
