import Link from 'next/link';
import connectDB from '@/lib/db';
import Gear from '@/models/Gear';

async function getTrendingGear() {
  try {
    await connectDB();
    const gear = await Gear.find({ isAvailable: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
    
    return gear;
  } catch (error) {
    console.error('Error fetching trending gear:', error);
    return [];
  }
}

export default async function Home() {
  const trendingGear = await getTrendingGear();

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-[#F8FAFC] py-20 md:py-32">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Rent the Best Gear
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-[#94A3B8]">
              Connect with photographers worldwide and access professional camera equipment
            </p>
            <Link
              href="/gear"
              className="inline-block px-8 py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold rounded-lg text-lg transition-colors"
            >
              Browse Gear
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Trusted Brands Section */}
      <section className="py-12 bg-[#1E293B]">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-semibold mb-8 text-[#F8FAFC]">
            Trusted Brands
          </h2>
          <div className="flex items-center justify-center space-x-12 overflow-x-auto py-4">
            {['Sony', 'Canon', 'Nikon', 'RED', 'Panasonic', 'Fujifilm'].map((brand) => (
              <div
                key={brand}
                className="flex-shrink-0 text-3xl font-bold text-[#94A3B8] hover:text-[#06B6D4] transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-16 bg-[#0F172A]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#F8FAFC]">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-[#1E293B] hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#3B82F6] text-[#F8FAFC] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#F8FAFC]">Find Gear</h3>
              <p className="text-[#94A3B8]">
                Search and browse through thousands of camera equipment listings
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-[#1E293B] hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#3B82F6] text-[#F8FAFC] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#F8FAFC]">Book Dates</h3>
              <p className="text-[#94A3B8]">
                Select your rental period and confirm your booking
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-[#1E293B] hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#3B82F6] text-[#F8FAFC] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#F8FAFC]">Shoot</h3>
              <p className="text-[#94A3B8]">
                Receive the gear and start creating amazing content
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Categories Section */}
      <section className="py-16 bg-[#1E293B]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#F8FAFC]">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'DSLR Cameras', category: 'DSLR' },
              { name: 'Mirrorless Cameras', category: 'Mirrorless' },
              { name: 'Drones', category: 'Drones' },
              { name: 'Lighting Equipment', category: 'Lighting' },
            ].map((cat) => (
              <Link
                key={cat.category}
                href={`/gear?category=${cat.category}`}
                className="block p-6 bg-[#0F172A] rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <h3 className="text-xl font-semibold mb-2 text-[#F8FAFC]">{cat.name}</h3>
                <p className="text-[#94A3B8] text-sm">Browse {cat.category.toLowerCase()} gear</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trending Gear Section */}
      <section className="py-16 bg-[#0F172A]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#F8FAFC]">Trending Gear</h2>
          {trendingGear.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {trendingGear.map((item) => (
                <Link
                  key={item._id}
                  href={`/gear/${item._id}`}
                  className="block bg-[#1E293B] rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="relative h-64 bg-[#334155] overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#94A3B8]">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 text-[#F8FAFC]">{item.name}</h3>
                    <p className="text-[#94A3B8] text-sm mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[#3B82F6] font-bold">${item.dailyRate}/day</span>
                      <span className="text-xs bg-[#3B82F6]/20 text-[#3B82F6] px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#94A3B8]">No gear available yet. Check back soon!</p>
          )}
        </div>
      </section>

      {/* 6. Why LensLocker Section */}
      <section className="py-16 bg-[#1E293B]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#F8FAFC]">Why LensLocker</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#06B6D4] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#F8FAFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#F8FAFC]">Insurance Included</h3>
              <p className="text-[#94A3B8] text-sm">
                All rentals come with comprehensive insurance coverage
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#06B6D4] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#F8FAFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#F8FAFC]">Verified Owners</h3>
              <p className="text-[#94A3B8] text-sm">
                All gear owners are verified and trusted members
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#06B6D4] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#F8FAFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#F8FAFC]">Secure Payments</h3>
              <p className="text-[#94A3B8] text-sm">
                Safe and secure payment processing for all transactions
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#06B6D4] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#F8FAFC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#F8FAFC]">24/7 Support</h3>
              <p className="text-[#94A3B8] text-sm">
                Round-the-clock customer support whenever you need help
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Community CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Join 10,000+ Photographers</h2>
            <p className="text-xl text-[#94A3B8] mb-8">
              Be part of the largest community of camera gear enthusiasts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] w-full"
              />
              <button className="px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg font-semibold transition-colors w-full sm:w-auto">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-[#94A3B8] mt-4">
              Get updates on new gear, exclusive deals, and community events
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
