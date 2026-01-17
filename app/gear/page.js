import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import connectDB from '@/lib/db';
import Gear from '@/models/Gear';

async function getGear() {
  try {
    await connectDB();
    const gear = await Gear.find({ isAvailable: true })
      .sort({ createdAt: -1 })
      .lean();
    
    return gear;
  } catch (error) {
    console.error('Error fetching gear:', error);
    return [];
  }
}

export default async function GearPage() {
  const gear = await getGear();

  return (
    <div className="min-h-screen bg-[#0F172A] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#F8FAFC] mb-2">Browse Camera Gear</h1>
          <p className="text-[#94A3B8]">Find the perfect equipment for your next shoot</p>
        </div>

        {gear.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4">
              <svg
                className="mx-auto h-24 w-24 text-[#94A3B8]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">No Gear Available</h3>
            <p className="text-[#94A3B8] mb-6">Check back soon for new listings!</p>
            <Link
              href="/gear/add"
              className="inline-block px-6 py-3 bg-[#3B82F6] text-[#F8FAFC] rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              List Your Gear
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gear.map((item) => (
              <Link
                key={item._id}
                href={`/gear/${item._id}`}
                className="group bg-[#1E293B] rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
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
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#3B82F6] text-[#F8FAFC] text-xs font-semibold px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2 group-hover:text-[#3B82F6] transition-colors">
                    {item.name}
                  </h3>
                  {item.brand && item.model && (
                    <p className="text-sm text-[#94A3B8] mb-3">
                      {item.brand} {item.model}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-sm text-[#94A3B8] mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-[#334155]">
                    <div>
                      <span className="text-2xl font-bold text-[#3B82F6]">
                        {formatPrice(item.dailyRate)}
                      </span>
                      <span className="text-sm text-[#94A3B8]">/day</span>
                    </div>
                    {item.location?.city && (
                      <div className="text-sm text-[#94A3B8]">
                        <svg
                          className="inline-block w-4 h-4 mr-1"
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
            ))}
          </div>
        )}

        {gear.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-[#94A3B8]">
              Showing {gear.length} {gear.length === 1 ? 'item' : 'items'} available for rent
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
