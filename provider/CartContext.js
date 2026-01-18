'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('lenslockerCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('lenslockerCart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const addToCart = (gear) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item._id === gear._id);
      if (existingItem) {
        return prev; // Item already in cart
      }
      return [...prev, {
        ...gear,
        startDate: null,
        endDate: null,
        duration: 1,
        totalPrice: gear.dailyRate,
      }];
    });
  };

  const removeFromCart = (gearId) => {
    setCartItems(prev => prev.filter(item => item._id !== gearId));
  };

  const updateCartItem = (gearId, updates) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === gearId ? { ...item, ...updates } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItem,
      clearCart,
      getTotalPrice,
      isLoading,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
