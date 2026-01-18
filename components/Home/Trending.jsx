'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import { formatPrice } from '@/lib/utils';

export default function Trending({ trendingGear }) {
  return (
    <section className="py-16 bg-[#0F172A]">
      <div className="container mx-auto px-4">
        <SectionHeader title="Trending Gear" subtitle="Discover the most popular equipment right now" centered={true} />
        {trendingGear.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              loop={true}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              speed={4000}
            >
              {trendingGear.map((item) => (
                <SwiperSlide key={item._id}>
                  <Link
                    href={`/gear/${item._id}`}
                    className="group bg-[#1E293B] rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 bg-[#334155] overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#94A3B8]">
                          <svg
                            className="w-16 h-16"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                      {/* Category Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#3B82F6] text-[#F8FAFC] text-xs font-semibold px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2 group-hover:text-[#3B82F6] transition-colors line-clamp-1">
                        {item.name}
                      </h3>

                      {/* Brand & Model */}
                      {item.brand && item.model && (
                        <p className="text-sm text-[#94A3B8] mb-3">
                          {item.brand} {item.model}
                        </p>
                      )}

                      {/* Description */}
                      {item.description && (
                        <p className="text-sm text-[#94A3B8] mb-4 line-clamp-2 flex-grow">
                          {item.description}
                        </p>
                      )}

                      {/* Price & Location */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#334155] mt-auto">
                        <div>
                          <span className="text-2xl font-bold text-[#3B82F6]">
                            {formatPrice(item.dailyRate)}
                          </span>
                          <span className="text-sm text-[#94A3B8]">/day</span>
                        </div>
                        {item.location?.city && (
                          <div className="text-sm text-[#94A3B8] flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {item.location.city}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Card hover={false} className="text-center py-16">
              <p className="body-text text-muted text-lg">No gear available yet. Check back soon!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
