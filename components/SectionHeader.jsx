'use client';

export default function SectionHeader({ title, subtitle, centered = true }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="section-header mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="body-text text-muted text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
