'use client';

import { useCart } from '@/provider/CartContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function RentButton({ gear }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(gear);
    toast.success(`${gear.name} added to cart!`);
    router.push('/cart');
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-gradient-to-r from-brand-primary to-brand-accent hover:shadow-xl hover:shadow-brand-primary/30 text-[#F8FAFC] font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
    >
      Request to Rent This Gear
    </button>
  );
}
