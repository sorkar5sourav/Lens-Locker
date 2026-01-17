'use client';

import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { loginAction } from '@/actions/authActions';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/gear';
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const formData = new FormData(e.target);
    formData.append('redirect', redirect);

    startTransition(async () => {
      try {
        await loginAction(formData);
      } catch (err) {
        setError(err.message || 'Invalid credentials. Please try again.');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#F8FAFC]">
            Sign in to LensLocker
          </h2>
          <p className="mt-2 text-center text-sm text-[#94A3B8]">
            Access your account to add gear listings
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-900/30 border border-red-800 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-300">
                    {error}
                  </h3>
                </div>
              </div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#334155] bg-[#1E293B] placeholder-[#94A3B8] text-[#F8FAFC] rounded-t-md focus:outline-none focus:ring-[#3B82F6] focus:border-[#3B82F6] focus:z-10 sm:text-sm"
                placeholder="Email address"
                disabled={isPending}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#334155] bg-[#1E293B] placeholder-[#94A3B8] text-[#F8FAFC] rounded-b-md focus:outline-none focus:ring-[#3B82F6] focus:border-[#3B82F6] focus:z-10 sm:text-sm"
                placeholder="Password"
                disabled={isPending}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#F8FAFC] bg-[#3B82F6] hover:bg-[#2563EB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3B82F6] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-sm text-center text-[#94A3B8]">
            <p>Demo credentials:</p>
            <p className="font-mono text-xs mt-1">
              Email: admin@example.com<br />
              Password: 123456
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
