import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import connectDB from '@/lib/db';
import Gear from '@/models/Gear';
import RentButton from '@/components/RentButton';

async function getGearItem(id) {
  try {
    await connectDB();
    const gear = await Gear.findById(id).lean();
    
    if (!gear) {
      return null;
    }
    
    // Convert Mongoose documents to plain objects and ObjectIds to strings
    return {
      ...gear,
      _id: gear._id?.toString() || gear._id,
      createdAt: gear.createdAt?.toISOString() || gear.createdAt,
      updatedAt: gear.updatedAt?.toISOString() || gear.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching gear item:', error);
    return null;
  }
}

export default async function GearDetailPage({ params }) {
  const { id } = await params;
  const gear = await getGearItem(id);

  if (!gear) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0F172A] py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-[#94A3B8]">
            <li>
              <Link href="/" className="hover:text-[#3B82F6]">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/gear" className="hover:text-[#3B82F6]">
                Gear
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#F8FAFC]">{gear.name}</li>
          </ol>
        </nav>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image Section */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-2xl overflow-hidden border border-slate-700 border-opacity-50 sticky top-8">
              <div className="relative h-[400px] lg:h-[500px] bg-[#334155] overflow-hidden group">
                {gear.image ? (
                  <img
                    src={gear.image}
                    alt={gear.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#94A3B8]">
                    <svg
                      className="w-24 h-24"
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
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-brand-primary to-brand-accent text-[#F8FAFC] text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    {gear.category}
                  </span>
                </div>
              </div>

              {/* Additional Images Gallery (if available) */}
              {gear.images && gear.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 p-4 bg-[#0F172A] border-t border-slate-700 border-opacity-30">
                  {gear.images.slice(0, 4).map((imageUrl, index) => (
                    <div key={index} className="relative h-20 bg-[#334155] rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-brand-primary transition-all">
                      <img
                        src={imageUrl}
                        alt={`${gear.name} view ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-lg p-8 border border-slate-700 border-opacity-50">
              <h1 className="text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-3">{gear.name}</h1>
              {gear.brand && gear.model && (
                <p className="text-xl text-[#94A3B8] mb-6 font-medium">
                  {gear.brand} {gear.model}
                </p>
              )}
              
              {/* Price */}
              <div className="flex items-baseline space-x-3 mb-6 pb-6 border-b border-slate-700 border-opacity-30">
                <span className="text-5xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                  {formatPrice(gear.dailyRate)}
                </span>
                <span className="text-xl text-[#94A3B8]">/day</span>
              </div>

              {/* Availability Badge */}
              <div>
                <span className={`inline-block px-5 py-2 rounded-full text-sm font-bold ${
                  gear.isAvailable
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {gear.isAvailable ? '✓ Available for Rental' : '✕ Currently Unavailable'}
                </span>
              </div>
            </div>

            {/* Description */}
            {gear.description && (
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-lg p-8 border border-slate-700 border-opacity-50">
                <h2 className="text-2xl font-bold mb-4 text-[#F8FAFC]">About This Gear</h2>
                <p className="text-[#CBD5E1] leading-relaxed whitespace-pre-wrap text-lg">
                  {gear.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            {gear.specifications && (
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-lg p-8 border border-slate-700 border-opacity-50">
                <h2 className="text-2xl font-bold mb-6 text-[#F8FAFC]">Technical Specifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {gear.specifications.resolution && (
                    <div className="p-4 rounded-xl bg-[#0F172A]/50 border border-slate-700 border-opacity-30">
                      <span className="text-xs font-semibold text-brand-primary uppercase tracking-wide">Resolution</span>
                      <p className="text-[#F8FAFC] font-bold text-lg mt-2">{gear.specifications.resolution}</p>
                    </div>
                  )}
                  {gear.specifications.sensor && (
                    <div className="p-4 rounded-xl bg-[#0F172A]/50 border border-slate-700 border-opacity-30">
                      <span className="text-xs font-semibold text-brand-primary uppercase tracking-wide">Sensor</span>
                      <p className="text-[#F8FAFC] font-bold text-lg mt-2">{gear.specifications.sensor}</p>
                    </div>
                  )}
                  {gear.specifications.iso && (
                    <div className="p-4 rounded-xl bg-[#0F172A]/50 border border-slate-700 border-opacity-30">
                      <span className="text-xs font-semibold text-brand-primary uppercase tracking-wide">ISO Range</span>
                      <p className="text-[#F8FAFC] font-bold text-lg mt-2">{gear.specifications.iso}</p>
                    </div>
                  )}
                  {gear.specifications.weight && (
                    <div className="p-4 rounded-xl bg-[#0F172A]/50 border border-slate-700 border-opacity-30">
                      <span className="text-xs font-semibold text-brand-primary uppercase tracking-wide">Weight</span>
                      <p className="text-[#F8FAFC] font-bold text-lg mt-2">{gear.specifications.weight}</p>
                    </div>
                  )}
                  {gear.specifications.video && (
                    <div className="p-4 rounded-xl bg-[#0F172A]/50 border border-slate-700 border-opacity-30 sm:col-span-2">
                      <span className="text-xs font-semibold text-brand-primary uppercase tracking-wide">Video Recording</span>
                      <p className="text-[#F8FAFC] font-bold text-lg mt-2">{gear.specifications.video}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - Location & Availability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Location */}
          {gear.location && (gear.location.city || gear.location.state) && (
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-lg p-8 border border-slate-700 border-opacity-50 hover:border-brand-primary hover:border-opacity-70 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center border border-brand-primary/30">
                    <svg
                      className="w-6 h-6 text-brand-primary"
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
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[#F8FAFC] mb-2">Pickup Location</h2>
                  <p className="text-[#CBD5E1] text-lg font-semibold">
                    {gear.location.city}
                    {gear.location.state && `, ${gear.location.state}`}
                  </p>
                  {gear.location.zipCode && (
                    <p className="text-sm text-[#94A3B8] mt-1">{gear.location.zipCode}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Availability Status */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-lg p-8 border border-slate-700 border-opacity-50">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#F8FAFC]">Rental Status</h2>
              </div>
              <span className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide border ${
                gear.isAvailable
                  ? 'bg-green-500/10 text-green-300 border-green-500/50'
                  : 'bg-red-500/10 text-red-300 border-red-500/50'
              }`}>
                {gear.isAvailable ? '● Available' : '● Unavailable'}
              </span>
            </div>
            
            {/* Booking CTA */}
            {gear.isAvailable && (
              <RentButton gear={gear} />
            )}
            {!gear.isAvailable && (
              <button disabled className="w-full bg-[#334155] text-[#64748B] font-bold py-4 px-6 rounded-xl cursor-not-allowed opacity-60">
                Currently Unavailable
              </button>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 pt-8 border-t border-slate-700 border-opacity-30">
          <Link
            href="/gear"
            className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-accent font-bold text-lg group transition-colors"
          >
            <svg
              className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to All Gear
          </Link>
        </div>
      </div>
    </div>
  );
}
