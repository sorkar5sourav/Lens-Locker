'use client';

export default function Card({ children, className = '', hover = true, ...props }) {
  const baseClasses = 'rounded-lg border border-slate-700 bg-[#1E293B] p-6 transition-all duration-300';
  const hoverClasses = hover ? 'hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/20' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
