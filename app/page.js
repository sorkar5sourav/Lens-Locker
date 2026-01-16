import Link from 'next/link';
import Image from 'next/image';

async function getTrendingGear() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/gear`, { cache: 'no-store' });
    if (!res.ok) return [];
    const gear = await res.json();
    return gear.slice(0, 3); // Get top 3 items
  } catch (error) {
    console.error('Error fetching trending gear:', error);
    return [];
  }
}

export default async function Home() {
  const trendingGear = await getTrendingGear();

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Rent the Best Gear
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with photographers worldwide and access professional camera equipment
            </p>
            <Link
              href="/gear"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-lg transition-colors"
            >
              Browse Gear
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Trusted Brands Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-semibold mb-8 text-gray-700">
            Trusted Brands
          </h2>
          <div className="flex items-center justify-center space-x-12 overflow-x-auto py-4">
            {['Sony', 'Canon', 'Nikon', 'RED', 'Panasonic', 'Fujifilm'].map((brand) => (
              <div
                key={brand}
                className="flex-shrink-0 text-3xl font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-blue-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Gear</h3>
              <p className="text-gray-600">
                Search and browse through thousands of camera equipment listings
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-blue-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Dates</h3>
              <p className="text-gray-600">
                Select your rental period and confirm your booking
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-blue-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Shoot</h3>
              <p className="text-gray-600">
                Receive the gear and start creating amazing content
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
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
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{cat.name}</h3>
                <p className="text-gray-600 text-sm">Browse {cat.category.toLowerCase()} gear</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trending Gear Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trending Gear</h2>
          {trendingGear.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {trendingGear.map((item) => (
                <Link
                  key={item._id}
                  href={`/gear/${item._id}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="relative h-64 bg-gray-200">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold">${item.dailyRate}/day</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No gear available yet. Check back soon!</p>
          )}
        </div>
      </section>

      {/* 6. Why LensLocker Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why LensLocker</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Insurance Included</h3>
              <p className="text-gray-600 text-sm">
                All rentals come with comprehensive insurance coverage
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Owners</h3>
              <p className="text-gray-600 text-sm">
                All gear owners are verified and trusted members
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">
                Safe and secure payment processing for all transactions
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">
                Round-the-clock customer support whenever you need help
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Community CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Join 10,000+ Photographers</h2>
            <p className="text-xl text-blue-100 mb-8">
              Be part of the largest community of camera gear enthusiasts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors w-full sm:w-auto">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              Get updates on new gear, exclusive deals, and community events
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
