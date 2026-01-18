'use client';

import { motion } from 'framer-motion';

export default function Community() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://imgs.search.brave.com/5VgR4JzUGp7_YZ25YDSF1h1jCvBgvKnTJFOBY1HHPFU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/d2VzZWVrdHJhdmVs/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMi8wMi9jYW1l/cmEtZ2Vhci1mb3It/dHJhdmVsLTEuanBn')`,
        }}
      />
      
      {/* Dark Overlay - High Contrast */}
      <div className="absolute inset-0 bg-[#0F172A] bg-opacity-75"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Headline */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.h2
              className="hero-headline text-[#F8FAFC] mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Join 10,000+ Photographers
            </motion.h2>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="body-text text-lg text-[#E2E8F0] max-w-2xl mx-auto text-center mb-8 leading-relaxed"
          >
            Be part of the largest community of camera gear enthusiasts and stay updated with the latest trends, exclusive deals, and networking opportunities
          </motion.p>

          {/* Subscription Form */}
          <motion.form
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-xl mx-auto mb-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-4 rounded-lg text-[#0F172A] bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-100 w-full transition-all duration-300 placeholder-[#64748B] font-medium"
            />
            <motion.button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-accent hover:shadow-xl hover:shadow-brand-primary/40 text-[#F8FAFC] rounded-lg font-bold transition-all duration-300 whitespace-nowrap w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe Now
            </motion.button>
          </motion.form>

          {/* Footer Text */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center text-center text-sm"
          >
            <div className="flex items-center gap-2 text-[#CBD5E1]">
              <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No spam, just valuable updates</span>
            </div>
            <div className="hidden sm:block text-[#64748B]">•</div>
            <div className="flex items-center gap-2 text-[#CBD5E1]">
              <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Unsubscribe anytime</span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#334155]"
          >
            {[
              { stat: '10K+', label: 'Active Members' },
              { stat: '50K+', label: 'Gear Listed' },
              { stat: '4.9★', label: 'Community Rating' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                whileHover={{ y: -5 }}
              >
                <p className="text-2xl font-bold text-brand-primary mb-1">{item.stat}</p>
                <p className="text-xs text-[#CBD5E1]">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
