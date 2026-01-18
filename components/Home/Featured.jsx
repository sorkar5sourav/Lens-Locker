'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';

export default function Featured() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const categories = [
    { name: 'DSLR Cameras', category: 'DSLR' },
    { name: 'Mirrorless Cameras', category: 'Mirrorless' },
    { name: 'Drones', category: 'Drones' },
    { name: 'Lighting Equipment', category: 'Lighting' },
  ];

  return (
    <section className="py-16 bg-[#1E293B] border-y border-slate-700 border-opacity-30">
      <div className="container mx-auto px-4">
        <SectionHeader title="Featured Categories" centered={true} />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <motion.div key={cat.category} variants={itemVariants} whileHover={{ y: -5 }}>
              <Link href={`/gear?category=${cat.category}`}>
                <Card hover={true} className="text-center">
                  <h3 className="text-lg font-semibold font-space mb-2 text-[#F8FAFC]">{cat.name}</h3>
                  <p className="body-text text-muted text-sm">Browse {cat.category.toLowerCase()} gear</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
