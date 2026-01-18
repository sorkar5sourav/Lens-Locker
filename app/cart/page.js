'use client';

import { useCart } from '@/provider/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartItem, clearCart, getTotalPrice } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    notes: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (gearId, field, value) => {
    const item = cartItems.find(item => item._id === gearId);
    if (!item) return;

    const startDate = field === 'startDate' ? new Date(value) : new Date(item.startDate);
    const endDate = field === 'endDate' ? new Date(value) : new Date(item.endDate);

    if (startDate && endDate && endDate > startDate) {
      const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const totalPrice = duration * item.dailyRate;

      updateCartItem(gearId, {
        [field]: value,
        duration,
        totalPrice,
      });
    } else if (field === 'startDate') {
      updateCartItem(gearId, { [field]: value });
    } else {
      updateCartItem(gearId, { [field]: value });
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!session?.user?.name || !session?.user?.email) {
      toast.error('Please log in to continue with checkout');
      return;
    }

    // Validate all items have dates
    for (const item of cartItems) {
      if (!item.startDate || !item.endDate) {
        toast.error(`Please select dates for ${item.name}`);
        return;
      }
    }

    setIsCheckingOut(true);
    try {
      const rentalData = cartItems.map(item => ({
        gearId: item._id,
        gearName: item.name,
        gearImage: item.image,
        userId: session?.user?.id,
        email: session?.user?.email,
        name: session?.user?.name,
        phone: session?.user?.phone || '01912345678',
        startDate: item.startDate,
        endDate: item.endDate,
        duration: item.duration || 1,
        dailyRate: item.dailyRate,
        totalPrice: item.totalPrice || item.dailyRate,
        location: item.location || 'Not specified',
        notes: formData.notes,
        status: 'pending',
      }));

      const response = await fetch('/api/rental', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rentals: rentalData }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Rental order placed successfully!');
        clearCart();
        setTimeout(() => {
          router.push('/orders');
        }, 1500);
      } else {
        toast.error(result.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Error placing order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0F172A] py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <svg className="mx-auto h-24 w-24 text-[#94A3B8] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h1 className="text-4xl font-bold text-[#F8FAFC] mb-4">Your Cart is Empty</h1>
            <p className="text-[#94A3B8] text-lg mb-8">Start adding gear to your rental cart!</p>
            <Link
              href="/gear"
              className="inline-block px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-accent text-[#F8FAFC] font-bold rounded-xl hover:shadow-xl hover:shadow-brand-primary/30 transition-all"
            >
              Browse Gear
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#F8FAFC] mb-8">Your Rental Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl border border-slate-700 border-opacity-50 p-6">
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-[#334155]">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#94A3B8]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#F8FAFC]">{item.name}</h3>
                        {item.brand && item.model && (
                          <p className="text-sm text-[#94A3B8]">{item.brand} {item.model}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-400 hover:text-red-300 font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Date Pickers */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <label className="text-xs font-semibold text-[#94A3B8] block mb-1">Start Date</label>
                        <input
                          type="date"
                          value={item.startDate || ''}
                          onChange={(e) => handleDateChange(item._id, 'startDate', e.target.value)}
                          className="w-full px-3 py-2 bg-[#0F172A] border border-slate-700 rounded-lg text-[#F8FAFC] text-sm focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#94A3B8] block mb-1">End Date</label>
                        <input
                          type="date"
                          value={item.endDate || ''}
                          onChange={(e) => handleDateChange(item._id, 'endDate', e.target.value)}
                          className="w-full px-3 py-2 bg-[#0F172A] border border-slate-700 rounded-lg text-[#F8FAFC] text-sm focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-[#94A3B8]">
                        {item.duration && `${item.duration} day${item.duration > 1 ? 's' : ''} × ${formatPrice(item.dailyRate)}`}
                      </div>
                      <div className="text-xl font-bold text-brand-primary">{formatPrice(item.totalPrice || item.dailyRate)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Form */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl border border-slate-700 border-opacity-50 p-8 h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6">Complete Your Order</h2>

            <form onSubmit={handleCheckout} className="space-y-4">
              {/* Name - Hardcoded */}
              <div>
                <label className="text-sm font-semibold text-[#94A3B8] block mb-2">Full Name</label>
                <div className="px-4 py-2 bg-[#0F172A] border border-slate-700 rounded-lg text-[#F8FAFC]">
                  {session?.user?.name || 'Not provided'}
                </div>
              </div>

              {/* Email - Hardcoded */}
              <div>
                <label className="text-sm font-semibold text-[#94A3B8] block mb-2">Email</label>
                <div className="px-4 py-2 bg-[#0F172A] border border-slate-700 rounded-lg text-[#F8FAFC]">
                  {session?.user?.email || 'Not provided'}
                </div>
              </div>

              {/* Phone - Hardcoded */}
              <div>
                <label className="text-sm font-semibold text-[#94A3B8] block mb-2">Phone</label>
                <div className="px-4 py-2 bg-[#0F172A] border border-slate-700 rounded-lg text-[#F8FAFC]">
                  {session?.user?.phone || '01912345678'}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-semibold text-[#94A3B8] block mb-2">Special Requests</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormChange}
                  placeholder="Any special requests or notes..."
                  rows="3"
                  className="w-full px-4 py-2 bg-[#0F172A] border border-slate-700 rounded-lg text-[#F8FAFC] focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
                />
              </div>

              {/* Price Summary */}
              <div className="border-t border-slate-700 border-opacity-30 pt-4 mt-6">
                <div className="flex justify-between mb-2 text-[#94A3B8]">
                  <span>Subtotal</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between mb-4 text-[#94A3B8]">
                  <span>Insurance & Fees</span>
                  <span className="text-green-400">Included</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-[#F8FAFC]">
                  <span>Total</span>
                  <span className="text-brand-primary">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="submit"
                disabled={isCheckingOut}
                className="w-full bg-gradient-to-r from-brand-primary to-brand-accent hover:shadow-xl hover:shadow-brand-primary/30 text-[#F8FAFC] font-bold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isCheckingOut ? 'Processing...' : 'Place Rental Order'}
              </button>

              {/* Continue Shopping */}
              <Link
                href="/gear"
                className="block text-center text-brand-primary hover:text-brand-accent font-medium py-2 transition-colors"
              >
                Continue Shopping
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
