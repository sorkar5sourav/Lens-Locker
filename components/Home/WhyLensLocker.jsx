'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

export default function WhyLensLocker() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    { 
      icon: '🛡️', 
      title: 'Insurance Included', 
      desc: 'Comprehensive damage and theft coverage on all rentals. Peace of mind with zero deductibles for accidental damage.',
      details: [
        '• Full damage coverage',
        '• Theft protection',
        '• 24/7 claims support'
      ]
    },
    { 
      icon: '✓', 
      title: 'Verified Owners', 
      desc: 'All gear owners undergo thorough verification and identity checks. Trusted community of professional photographers.',
      details: [
        '• Identity verified',
        '• Equipment inspected',
        '• Community rated'
      ]
    },
    { 
      icon: '🔒', 
      title: 'Secure Payments', 
      desc: 'Bank-level encryption and PCI compliance. Your payment information is always protected and never shared.',
      details: [
        '• Bank-level security',
        '• Multiple payment options',
        '• Transparent pricing'
      ]
    },
    { 
      icon: '🎧', 
      title: '24/7 Support', 
      desc: 'Round-the-clock customer support via chat, email, and phone. Expert help whenever you need it most.',
      details: [
        '• Instant response team',
        '• Expert assistance',
        '• Issue resolution'
      ]
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Why LensLocker?" 
          subtitle="Experience the future of gear rental with industry-leading features"
          centered={true} 
        />
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="group relative"
            >
              {/* Gradient background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Card */}
              <motion.div
                className="relative h-full p-8 rounded-2xl border border-slate-700 border-opacity-50 bg-gradient-to-br from-[#1E293B] to-[#0F172A] hover:border-brand-primary hover:border-opacity-70 transition-all duration-300 overflow-hidden"
                whileHover={{ y: -8 }}
              >
                {/* Top accent line */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                  style={{ originX: 0 }}
                />

                {/* Icon Container */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-accent blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-2xl flex items-center justify-center border border-brand-primary/30 group-hover:border-brand-primary transition-colors">
                    <span className="text-4xl">{feature.icon}</span>
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold font-space mb-3 text-[#F8FAFC] group-hover:text-brand-primary transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed mb-6 h-16">
                  {feature.desc}
                </p>

                {/* Details List */}
                <div className="space-y-2 mb-6 text-xs text-[#94A3B8]">
                  {feature.details.map((detail, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-brand-primary font-bold">●</span>
                      {detail}
                    </motion.p>
                  ))}
                </div>

                {/* Learn More Link */}
                <motion.button
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 text-brand-primary text-sm font-semibold border border-brand-primary/50 hover:border-brand-primary/100 transition-all duration-300 group/btn"
                  whileHover={{ 
                    background: 'linear-gradient(to right, rgba(59, 130, 246, 0.3), rgba(10, 191, 211, 0.3))',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Learn More
                    <motion.svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </span>
                </motion.button>

                {/* Bottom glow effect */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-brand-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-[#94A3B8] text-lg mb-6">
            Join thousands of photographers who trust LensLocker
          </p>
          <motion.a
            href="/registration"
            className="inline-block px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-accent text-[#F8FAFC] font-semibold rounded-lg hover:shadow-xl hover:shadow-brand-primary/40 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
