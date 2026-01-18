'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import SectionHeader from '@/components/SectionHeader';

export default function Brands() {
  const brands = [
    { name: 'Fujifilm', image: 'https://imgs.search.brave.com/tXAcM7TAUPq19TfCddsaAAaTg4tR8LU8WRqrQA-tbeE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/aGlzdG9yeS5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MDUvRnVqaWZpbG0t/TG9nby0xOTg1LTEw/MjR4NTc2LnBuZw' },
    { name: 'Nikon', image: 'https://1000logos.net/wp-content/uploads/2017/03/Nikon-Logo-1965.jpg' },
    { name: 'Sony', image: 'https://www.freepnglogos.com/uploads/sony-png-logo/top-rated-smart-home-lighting-sony-png-logo-7.png' },
    { name: 'Canon', image: 'https://1000logos.net/wp-content/uploads/2016/10/Canon-Logo-500x313.png' },
    { name: 'RED', image: 'https://imgs.search.brave.com/6Ecu2AT9HtNGYROw5THSbPzruNTQWEOGc8P2ajrNBxA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFzWFNzbSt1bUwu/anBn' },
    { name: 'Panasonic', image: 'https://www.logoquake.com/wp-content/uploads/2024/06/panasonic-logoquake_2bb486.png' },
    { name: 'Kodak', image: 'https://www.kikkidu.com/wp-content/uploads/2020/10/1970s_logo_Kodak.png' },
    { name: 'Olympus', image: 'https://1000marcas.net/wp-content/uploads/2020/03/Logo-Olympus-500x313.png' },
  ];

  return (
    <section className="py-12 bg-[#1E293B] border-y border-slate-700 border-opacity-30">
      <div className="container mx-auto px-4">
        <SectionHeader title="Trusted Brands" centered={true} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="!pb-4"
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand.name}>
                <motion.div
                  className="flex items-center justify-center h-24 bg-[#0F172A] rounded-lg border border-slate-700 border-opacity-30 hover:border-opacity-60 transition-all duration-300"
                  whileHover={{ scale: 1.05, borderOpacity: 1 }}
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="max-h-16 max-w-[90%] object-contain"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}


/**
 * 
 * https://imgs.search.brave.com/8x16rMSnVe_I9uq6Q-ov2278eUWPwXkAwqpHSxsnh6Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzAz/L05pa29uLUxvZ28t/MTk2NS5qcGc
 * https://imgs.search.brave.com/00Olq7hVd9YBnnPrMmytu5ipxTGfpWoaanJwrTtGcz8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L3NvbnktcG5nLWxv/Z28vdG9wLXJhdGVk/LXNtYXJ0LWhvbWUt/bGlnaHRpbmctc29u/eS1wbmctbG9nby03/LnBuZw
 * https://imgs.search.brave.com/U5MrS-32GLGcpj0Q75XLZzufAPTRyek_6nrtda0mj6A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzEw/L0Nhbm9uLUxvZ28t/NTAweDMxMy5wbmc
 * 
 * https://imgs.search.brave.com/gc5P3v7PlJFGvEpTVDp0zNPARSf7pRQ0FZqbbKl-Kxk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9paDEu/cmVkYnViYmxlLm5l/dC9pbWFnZS41ODMx/MjY0MDQ4LjI2NzMv/c3Qsc21hbGwsNTA3/eDUwNy1wYWQsNjAw/eDYwMCxmOGY4Zjgu/anBn
 * https://imgs.search.brave.com/c2MLazA6aTCmBsW4KTl0UWiohv7-3peVhNPRtujDsvU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nb3F1YWtlLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8wNi9wYW5hc29u/aWMtbG9nb3F1YWtl/XzJiYjQ4Ni5wbmc
 * https://imgs.search.brave.com/ej_fBpwZOXZ88m1WWkC3QoGQEcq4WkCqwOlwt6JM2Dk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2lra2lkdS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MTAvMTk3MHNfbG9n/b19Lb2Rhay5wbmc
 * https://imgs.search.brave.com/cQVeXUAoEADM2X7200JI52Xqgt-B7eKTKaQhCmBB2Dg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bWFyY2FzLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/My9Mb2dvLU9seW1w/dXMtNTAweDMxMy5w/bmc
 */