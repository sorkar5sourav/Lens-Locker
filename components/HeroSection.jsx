'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import bg1 from '@/public/bg1.webp'

export default function HeroSection({ title, subtitle, cta, ctaLink }) {
  const backgroundImages = [
    'https://imgs.search.brave.com/FkeNP-yxS4oS530bXISZBOKmSLMiAUAI62kjBCZtVSI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTIv/NTIwLzM0Ny9zbWFs/bC9hLWNvbGxlY3Rp/b24tb2YtY2FtZXJh/LWdlYXItb24tYS1k/ZXNrLXBob3RvLmpw/ZWc',
    'https://imgs.search.brave.com/1VDDCjGr0aRwmQT4K1cPDk9Vxr-ekNXzP3SXLjxvGLA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGd5dGVjaC5jb20v/Y2RuL3Nob3AvY29s/bGVjdGlvbnMvQ29s/bGVjdGlvbl9JbWFn/ZV9CaWN5Y2xlLV8t/VmVoaWNsZS1TZXJp/ZXNfNzU0ODY1ZmMt/NTNlZS00NDdmLWE0/ZjMtZDliODdiZDc0/ZGZkLmpwZz92PTE2/ODA2Njc0MjI',
    'https://imgs.search.brave.com/5VgR4JzUGp7_YZ25YDSF1h1jCvBgvKnTJFOBY1HHPFU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/d2VzZWVrdHJhdmVs/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMi8wMi9jYW1l/cmEtZ2Vhci1mb3It/dHJhdmVsLTEuanBn',
    'https://imgs.search.brave.com/ORHV_wq2IlXdAB3ge-yDAHdgkffd5QIEqWkqVDgoYl4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGd5dGVjaC5jb20v/Y2RuL3Nob3AvY29s/bGVjdGlvbnMvQ29s/bGVjdGlvbl9JbWFn/ZV9PdGhlci1HZWFy/LmpwZz92PTE2Nzk5/ODM3NjQ',
    'https://imgs.search.brave.com/E8yLBYAMHpEeQgAMYYdnUN5_l80fw0OFgjvTL14LCbs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGd5dGVjaC5jb20v/Y2RuL3Nob3AvY29s/bGVjdGlvbnMvQ29s/bGVjdGlvbl9JbWFn/ZV9XZWFyYWJsZS1T/ZXJpZXNfYWU0NGU1/ODQtZDU2NS00N2Iw/LWI5MTItMDZiMDg0/OTFlZGM0LmpwZz92/PTE2ODQ0MTI2NDc',
  ];

  return (
    <div className="relative w-full py-20 md:py-32 px-4 overflow-hidden">
       {/* <img 
              
              src="https://imgs.search.brave.com/FkeNP-yxS4oS530bXISZBOKmSLMiAUAI62kjBCZtVSI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTIv/NTIwLzM0Ny9zbWFs/bC9hLWNvbGxlY3Rp/b24tb2YtY2FtZXJh/LWdlYXItb24tYS1k/ZXNrLXBob3RvLmpw/ZWc" alt="Background"
              className="w-full h-full object-cover object-center"
            /> */}
      {/* Background Carousel - Absolute positioned */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        className="absolute inset-0 w-full z-0"
      >
        {backgroundImages.map((bgImage, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <img 
              src={bgImage} alt={`Background ${index + 1}`}
              className="w-full h-[60vh] object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gray-900/60 z-10"></div>
      
      {/* Content - Fixed on top */}
      <div className="absolute inset-0 z-20 flex items-center justify-center min-h-[400px] md:min-h-[500px]">
        <div className="max-w-4xl text-center space-y-6">
          <h1 className="hero-headline text-[#F8FAFC]">
            {title}
          </h1>
          
          {subtitle && (
            <p className="body-text text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          
          {cta && ctaLink && (
            <div className="pt-4">
              <a
                href={ctaLink}
                className="inline-block px-8 py-3 bg-brand-primary hover:bg-[#2563EB] text-[#F8FAFC] font-semibold rounded-lg transition-colors duration-300 hover:shadow-lg hover:shadow-brand-primary/30"
              >
                {cta}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


/**
 * 
 * 
 * 
 * 
 * 
 * 
 */
