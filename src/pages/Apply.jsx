import React from 'react';
import { Helmet } from 'react-helmet-async';
import ApplicationForm from '../components/ApplicationForm';

export default function Apply() {
  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-12">
      <Helmet>
        <title>Online Admission | Malkala Hostel</title>
        <meta name="description" content="Fill out your official application form for the Malkala Hostel. Secure your seat today." />
      </Helmet>
      <ApplicationForm />
    </div>
  );
}
