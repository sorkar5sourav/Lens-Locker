'use client';

export default function HeroSection({ title, subtitle, cta, ctaLink, backgroundImage }) {
  return (
    <div 
      className="relative w-full py-20 md:py-32 px-4 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-[#0F172A] bg-opacity-60 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center space-y-6">
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
  );
}
