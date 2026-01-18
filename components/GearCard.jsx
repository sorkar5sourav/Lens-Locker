'use client';

import Link from 'next/link';
import Card from './Card';

export default function GearCard({ gear }) {
  return (
    <Link href={`/gear/${gear._id}`}>
      <Card hover={true} className="cursor-pointer h-full">
        {/* Image Container */}
        <div className="mb-4 bg-[#0F172A] rounded-md overflow-hidden aspect-square flex items-center justify-center border border-slate-700">
          {gear.image ? (
            <img 
              src={gear.image} 
              alt={gear.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-muted text-sm">No image available</div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Badge */}
          {gear.condition && (
            <div className="label-small inline-block px-2 py-1 bg-brand-primary bg-opacity-10 text-brand-primary rounded">
              {gear.condition}
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-semibold font-space text-[#F8FAFC] truncate hover:text-brand-primary transition-colors">
            {gear.name}
          </h3>

          {/* Description */}
          {gear.description && (
            <p className="body-text text-sm text-muted line-clamp-2">
              {gear.description}
            </p>
          )}

          {/* Tech Specs */}
          <div className="space-y-1 pt-2">
            {gear.model && (
              <div className="tech-spec text-xs">
                {gear.model}
              </div>
            )}
            {gear.specs && (
              <div className="text-xs text-muted space-y-1">
                {Object.entries(gear.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-slate-500 capitalize">{key}:</span>
                    <span className="font-mono text-brand-accent">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="pt-3 border-t border-slate-700 flex justify-between items-center">
            <span className="text-sm text-muted">Daily Rate</span>
            <span className="text-lg font-bold font-space text-brand-primary">
              ${gear.pricePerDay}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
