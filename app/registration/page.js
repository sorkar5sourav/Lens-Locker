'use client';

import RegisterForm from '@/components/RegistrationForm';
import Link from 'next/link';

export default function RegistrationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold font-space text-brand-accent">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-muted">
            Join LensLocker and start sharing your gear
          </p>
        </div>

        <div className="bg-[#1E293B] rounded-lg border border-slate-700 p-8">
          <RegisterForm />
        </div>

        <div className="text-center text-sm text-muted">
          <p>Already have an account?{' '}
            <Link href="/login" className="text-brand-primary hover:text-[#3B82F6] font-semibold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
