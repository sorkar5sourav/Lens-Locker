'use client';

import { Suspense } from 'react';
import RegistrationForm from '@/components/RegistrationForm';

export default function RegistrationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <div className="text-center">
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    }>
      <RegistrationForm />
    </Suspense>
  );
}
