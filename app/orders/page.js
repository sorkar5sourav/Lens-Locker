'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchOrders();
    }
  }, [session]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/rental?email=${encodeURIComponent(session?.user?.email)}`);
      const result = await response.json();
      if (result.success) {
        setOrders(result.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30',
      confirmed: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      ongoing: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      completed: 'bg-green-500/10 text-green-300 border-green-500/30',
      cancelled: 'bg-red-500/10 text-red-300 border-red-500/30',
    };
    return colors[status] || colors.pending;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0F172A] py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-[#F8FAFC] mb-4">Please Sign In</h1>
          <p className="text-[#94A3B8] mb-8">You need to be logged in to view your orders.</p>
          <Link
            href="/login"
            className="inline-block px-8 py-4 bg-brand-primary hover:bg-[#2563EB] text-[#F8FAFC] font-bold rounded-xl transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#F8FAFC] mb-8">My Rental Orders</h1>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-brand-primary border-r-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-[#94A3B8] mt-4">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <svg className="mx-auto h-24 w-24 text-[#94A3B8] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">No Orders Yet</h2>
            <p className="text-[#94A3B8] mb-8">You haven`t placed any rental orders yet.</p>
            <Link
              href="/gear"
              className="inline-block px-8 py-4 bg-brand-primary hover:bg-[#2563EB] text-[#F8FAFC] font-bold rounded-xl transition-colors"
            >
              Start Browsing Gear
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl border border-slate-700 border-opacity-50 p-6 hover:border-brand-primary hover:border-opacity-50 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Gear Image */}
                  <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden bg-[#334155]">
                    {order.gearImage ? (
                      <img src={order.gearImage} alt={order.gearName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#94A3B8]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Order Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#F8FAFC]">{order.gearName}</h3>
                        <p className="text-sm text-[#94A3B8]">Order ID: {order._id.substring(0, 8)}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-[#94A3B8] font-medium">Start Date</p>
                        <p className="text-[#CBD5E1] font-semibold">{formatDate(order.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-[#94A3B8] font-medium">End Date</p>
                        <p className="text-[#CBD5E1] font-semibold">{formatDate(order.endDate)}</p>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700 border-opacity-30">
                      <div>
                        <p className="text-[#94A3B8] text-sm">
                          {order.duration} day{order.duration > 1 ? 's' : ''} × {formatPrice(order.dailyRate)}/day
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#94A3B8] text-sm">Total</p>
                        <p className="text-2xl font-bold text-brand-primary">{formatPrice(order.totalPrice)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
