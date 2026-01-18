'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const steps = [
    { 
      num: '1', 
      icon: '🔍',
      title: 'Explore & Find', 
      desc: 'Search and browse through thousands of premium camera equipment listings. Filter by category, brand, price, and availability.' 
    },
    { 
      num: '2', 
      icon: '📅',
      title: 'Book Your Dates', 
      desc: 'Select your rental period with flexible durations. Check real-time availability and instant booking confirmation.' 
    },
    { 
      num: '3', 
      icon: '📦',
      title: 'Receive Gear', 
      desc: 'Get your equipment delivered or pick it up. Includes insurance, user manual, and 24/7 support.' 
    },
    { 
      num: '4', 
      icon: '🎬',
      title: 'Create Magic', 
      desc: 'Shoot your project with professional-grade gear. Return within the rental period and earn rewards.' 
    },
  ];

  return (
    <section className="py-20 bg-[#0F172A]">
      <div className="container mx-auto px-4">
        <SectionHeader title="How It Works" centered={true} />
        
        {/* Connection line - visible on lg screens */}
        <div className="hidden lg:block absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent mt-32 opacity-30" style={{ top: '280px' }}></div>
        
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={step.num} 
              variants={itemVariants}
              className="relative"
            >
              {/* Connection dot for lg screens */}
              <div className="hidden lg:flex absolute -top-16 left-1/2 transform -translate-x-1/2 items-center justify-center">
                <div className="w-3 h-3 bg-brand-primary rounded-full border-2 border-[#0F172A]"></div>
              </div>

              <Card hover={true} className="h-full flex flex-col text-center bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-slate-700 border-opacity-50 hover:border-brand-primary hover:border-opacity-100 transition-all duration-300">
                {/* Step Number Circle */}
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-brand-primary to-[#1E40AF] text-[#F8FAFC] rounded-full flex items-center justify-center text-3xl font-bold font-space mx-auto mb-6 shadow-lg shadow-brand-primary/30 flex-shrink-0"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.num}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                >
                  {step.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-semibold font-space mb-3 text-[#F8FAFC]">{step.title}</h3>

                {/* Description */}
                <p className="body-text text-muted text-sm leading-relaxed flex-grow">{step.desc}</p>

                {/* Bottom accent */}
                <motion.div 
                  className="mt-6 h-1 w-12 bg-gradient-to-r from-brand-primary to-[#1E40AF] mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          className="mt-16 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {steps.map((_, i) => (
            <div key={i} className={`h-2 rounded-full ${i < 3 ? 'w-2 bg-muted' : 'w-2 bg-brand-primary'}`}></div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
