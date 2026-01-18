import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import connectDB from '@/lib/db';
import Gear from '@/models/Gear';

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="bg-[#1E293B] rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-[500px] bg-[#334155] overflow-hidden">
              {gear.image ? (
                <img
                  src={gear.image}
                  alt={gear.name}
                  className="w-full h-full object-cover"
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
                <span className="bg-[#3B82F6] text-[#F8FAFC] text-sm font-semibold px-4 py-2 rounded-full">
                  {gear.category}
                </span>
              </div>
            </div>

            {/* Additional Images Gallery (if available) */}
            {gear.images && gear.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2 p-4 bg-[#0F172A]">
                {gear.images.slice(0, 4).map((imageUrl, index) => (
                  <div key={index} className="relative h-20 bg-[#334155] rounded overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={`${gear.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-[#F8FAFC] mb-2">{gear.name}</h1>
              {gear.brand && gear.model && (
                <p className="text-xl text-[#94A3B8] mb-4">
                  {gear.brand} {gear.model}
                </p>
              )}
              
              {/* Price */}
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-4xl font-bold text-[#3B82F6]">
                  {formatPrice(gear.dailyRate)}
                </span>
                <span className="text-lg text-[#94A3B8]">/day</span>
              </div>
            </div>

            {/* Description */}
            {gear.description && (
              <div className="bg-[#1E293B] rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#F8FAFC]">Description</h2>
                <p className="text-[#94A3B8] leading-relaxed whitespace-pre-wrap">
                  {gear.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            {gear.specifications && (
              <div className="bg-[#1E293B] rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#F8FAFC]">Specifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gear.specifications.resolution && (
                    <div>
                      <span className="text-sm font-medium text-[#94A3B8]">Resolution</span>
                      <p className="text-[#F8FAFC] font-semibold">{gear.specifications.resolution}</p>
                    </div>
                  )}
                  {gear.specifications.sensor && (
                    <div>
                      <span className="text-sm font-medium text-[#94A3B8]">Sensor</span>
                      <p className="text-[#F8FAFC] font-semibold">{gear.specifications.sensor}</p>
                    </div>
                  )}
                  {gear.specifications.iso && (
                    <div>
                      <span className="text-sm font-medium text-[#94A3B8]">ISO Range</span>
                      <p className="text-[#F8FAFC] font-semibold">{gear.specifications.iso}</p>
                    </div>
                  )}
                  {gear.specifications.weight && (
                    <div>
                      <span className="text-sm font-medium text-[#94A3B8]">Weight</span>
                      <p className="text-[#F8FAFC] font-semibold">{gear.specifications.weight}</p>
                    </div>
                  )}
                  {gear.specifications.video && (
                    <div className="sm:col-span-2">
                      <span className="text-sm font-medium text-[#94A3B8]">Video</span>
                      <p className="text-[#F8FAFC] font-semibold">{gear.specifications.video}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Location */}
            {gear.location && (gear.location.city || gear.location.state) && (
              <div className="bg-[#1E293B] rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#F8FAFC]">Location</h2>
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-[#3B82F6] mt-1"
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
                  <div>
                    <p className="text-[#F8FAFC] font-semibold">
                      {gear.location.city}
                      {gear.location.state && `, ${gear.location.state}`}
                    </p>
                    {gear.location.zipCode && (
                      <p className="text-sm text-[#94A3B8]">{gear.location.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Availability Status */}
            <div className="bg-[#1E293B] rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#F8FAFC]">Availability</h2>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  gear.isAvailable
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {gear.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </div>
              
              {/* Contact/Booking CTA - Future Enhancement */}
              {gear.isAvailable && (
                <button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold py-3 px-6 rounded-lg transition-colors">
                  Request to Rent
                </button>
              )}
            </div>

            {/* Back Button */}
            <Link
              href="/gear"
              className="inline-flex items-center text-[#3B82F6] hover:text-[#2563EB] font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              Back to Browse Gear
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
