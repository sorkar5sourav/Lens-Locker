'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/provider/CartContext';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { cartItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
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
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative p-2 text-[#F8FAFC] hover:text-brand-primary transition-colors rounded-lg hover:bg-[#0F172A]"
              title="View cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-primary text-[#F8FAFC] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User Avatar Dropdown */}
            {isAuthenticated ? (
              <div className="relative group">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-[#0F172A] transition-colors"
                >
                  <div className="relative w-8 h-8 rounded-full border-2 border-brand-primary overflow-hidden">
                    <img
                      src={session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || 'User')}&background=06B6D4&color=fff`}
                      alt={session?.user?.name || 'User'}
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-linear-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-2xl border border-slate-700 border-opacity-50 overflow-hidden z-50">
                    {/* User Info */}
                    <div className="px-4 py-4 border-b border-slate-700 border-opacity-30">
                      <p className="text-sm font-semibold text-[#F8FAFC]">{session?.user?.name}</p>
                      <p className="text-xs text-[#94A3B8] truncate">{session?.user?.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/orders"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-[#F8FAFC] hover:bg-[#0F172A] transition-colors"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <span>My Orders</span>
                      </Link>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-400 hover:bg-[#0F172A] transition-colors text-left border-t border-slate-700 border-opacity-30"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-700">
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
            <div className="pt-4 pb-3 border-t border-slate-700 border-opacity-30 space-y-3">
              {/* Cart Link */}
              <Link
                href="/cart"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-[#F8FAFC] hover:bg-[#0F172A] transition-colors relative"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span className="ml-auto bg-brand-primary text-[#0F172A] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* Auth Section */}
              {isAuthenticated ? (
                <>
                  {/* User Profile */}
                  <div className="flex items-center space-x-3 px-3 py-2 rounded-md bg-[#0F172A] border border-slate-700 border-opacity-30">
                    <div className="relative w-8 h-8 rounded-full border-2 border-brand-primary overflow-hidden shrink-0">
                      <img
                        src={session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || 'User')}&background=06B6D4&color=fff`}
                        alt={session?.user?.name || 'User'}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#F8FAFC]">{session?.user?.name}</p>
                      <p className="text-xs text-[#94A3B8] truncate">{session?.user?.email}</p>
                    </div>
                  </div>

                  {/* Orders Link */}
                  <Link
                    href="/orders"
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-[#F8FAFC] hover:bg-[#0F172A] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <span>My Orders</span>
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-[#0F172A] transition-colors text-left"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-semibold text-[#0F172A] bg-brand-primary hover:bg-[#2563EB] transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/registration"
                    className="block px-3 py-2 rounded-md text-base font-semibold text-[#0F172A] bg-brand-accent hover:bg-[#0891B2] transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
