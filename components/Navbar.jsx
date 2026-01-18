'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = status === 'authenticated';

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <nav className="bg-[#1E293B] bg-opacity-80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-slate-700 border-opacity-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold font-space text-[#06B6D4]">LensLocker</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/')
                  ? 'text-[#3B82F6] bg-[#0F172A]'
                  : 'text-[#F8FAFC] hover:text-[#3B82F6] hover:bg-[#0F172A]'
              }`}
            >
              Home
            </Link>
            <Link
              href="/gear"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/gear')
                  ? 'text-[#3B82F6] bg-[#0F172A]'
                  : 'text-[#F8FAFC] hover:text-[#3B82F6] hover:bg-[#0F172A]'
              }`}
            >
              Browse Gear
            </Link>
            {isAuthenticated && (
              <Link
                href="/gear/add"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/gear/add')
                    ? 'text-[#3B82F6] bg-[#0F172A]'
                    : 'text-[#F8FAFC] hover:text-[#3B82F6] hover:bg-[#0F172A]'
                }`}
              >
                Add Gear
              </Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted">
                  {session?.user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-[#F8FAFC] hover:text-brand-accent transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-[#F8FAFC] bg-brand-primary rounded-md hover:bg-[#2563EB] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/registration"
                  className="px-4 py-2 text-sm font-medium text-[#F8FAFC] bg-brand-accent rounded-md hover:bg-[#0891B2] transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#F8FAFC] hover:text-[#3B82F6] hover:bg-[#0F172A] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3B82F6]"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-[#334155]">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/')
                    ? 'text-[#3B82F6] bg-[#0F172A]'
                    : 'text-[#F8FAFC] hover:text-[#3B82F6] hover:bg-[#0F172A]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/gear"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/gear')
                    ? 'text-[#3B82F6] bg-[#0F172A]'
                    : 'text-[#F8FAFC] hover:text-[#3B82F6] hover:bg-[#0F172A]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Gear
              </Link>
              {isAuthenticated && (
                <Link
                  href="/gear/add"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/gear/add')
                      ? 'text-[#3B82F6] bg-[#0F172A]'
                      : 'text-[#F8FAFC] hover:text-[#3B82F6] hover:bg-[#0F172A]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add Gear
                </Link>
              )}
            </div>
            <div className="pt-4 pb-3 border-t border-slate-700 border-opacity-30">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <p className="px-3 py-2 text-sm text-muted">
                    {session?.user?.email}
                  </p>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-[#F8FAFC] hover:text-brand-accent hover:bg-[#0F172A] transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#F8FAFC] bg-brand-primary hover:bg-[#2563EB] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
