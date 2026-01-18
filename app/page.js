import Link from 'next/link';
import connectDB from '@/lib/db';
import Gear from '@/models/Gear';
import HeroSection from '@/components/HeroSection';
import SectionHeader from '@/components/SectionHeader';
import GearCard from '@/components/GearCard';
import Card from '@/components/Card';

async function getTrendingGear() {
  try {
    await connectDB();
    const gear = await Gear.find({ isAvailable: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
    
    // Convert Mongoose documents to plain objects
    const convertedGear = gear.map(item => ({
      ...item,
      _id: item._id?.toString() || item._id,
      createdAt: item.createdAt?.toISOString() || item.createdAt,
      updatedAt: item.updatedAt?.toISOString() || item.updatedAt,
    }));
    
    return convertedGear;
  } catch (error) {
    console.error('Error fetching trending gear:', error);
    return [];
  }
}

export default async function Home() {
  const trendingGear = await getTrendingGear();

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <HeroSection 
        title="Rent the Gear. Shoot the Vision."
        subtitle="Connect with photographers worldwide and access professional camera equipment at unbeatable prices"
        cta="Browse Gear"
        ctaLink="/gear"
      />

      {/* Trusted Brands Section */}
      <section className="py-12 bg-[#1E293B] border-y border-slate-700 border-opacity-30">
        <div className="container mx-auto px-4">
          <SectionHeader title="Trusted Brands" centered={true} />
          <div className="flex items-center justify-center space-x-12 overflow-x-auto py-4">
            {['Sony', 'Canon', 'Nikon', 'RED', 'Panasonic', 'Fujifilm'].map((brand) => (
              <div
                key={brand}
                className="flex-shrink-0 text-2xl font-space font-bold text-muted hover:text-brand-accent transition-colors duration-300"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-[#0F172A]">
        <div className="container mx-auto px-4">
          <SectionHeader title="How It Works" centered={true} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { num: '1', title: 'Find Gear', desc: 'Search and browse through thousands of camera equipment listings' },
              { num: '2', title: 'Book Dates', desc: 'Select your rental period and confirm your booking' },
              { num: '3', title: 'Shoot', desc: 'Receive the gear and start creating amazing content' }
            ].map((step) => (
              <Card key={step.num} hover={false} className="text-center">
                <div className="w-16 h-16 bg-brand-primary text-[#F8FAFC] rounded-full flex items-center justify-center text-2xl font-bold font-space mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold font-space mb-3 text-[#F8FAFC]">{step.title}</h3>
                <p className="body-text text-muted text-sm">
                  {step.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-16 bg-[#1E293B] border-y border-slate-700 border-opacity-30">
        <div className="container mx-auto px-4">
          <SectionHeader title="Featured Categories" centered={true} />
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
              >
                <Card hover={true} className="text-center">
                  <h3 className="text-lg font-semibold font-space mb-2 text-[#F8FAFC]">{cat.name}</h3>
                  <p className="body-text text-muted text-sm">Browse {cat.category.toLowerCase()} gear</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Gear Section */}
      <section className="py-16 bg-[#0F172A]">
        <div className="container mx-auto px-4">
          <SectionHeader title="Trending Gear" subtitle="Discover the most popular equipment right now" centered={true} />
          {trendingGear.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {trendingGear.map((item) => (
                <GearCard key={item._id} gear={item} />
              ))}
            </div>
          ) : (
            <Card hover={false} className="text-center py-16">
              <p className="body-text text-muted text-lg">
                No gear available yet. Check back soon!
              </p>
            </Card>
          )}
        </div>
      </section>

      {/* Why LensLocker Section */}
      <section className="py-16 bg-[#1E293B] border-y border-slate-700 border-opacity-30">
        <div className="container mx-auto px-4">
          <SectionHeader title="Why LensLocker" centered={true} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: 'shield', title: 'Insurance Included', desc: 'All rentals come with comprehensive insurance coverage' },
              { icon: 'check', title: 'Verified Owners', desc: 'All gear owners are verified and trusted members' },
              { icon: 'lock', title: 'Secure Payments', desc: 'Safe and secure payment processing for all transactions' },
              { icon: 'settings', title: '24/7 Support', desc: 'Round-the-clock customer support whenever you need help' }
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-brand-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-brand-accent text-2xl font-bold">✓</div>
                </div>
                <h3 className="text-lg font-semibold font-space mb-2 text-[#F8FAFC]">{feature.title}</h3>
                <p className="body-text text-muted text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="hero-headline">Join 10,000+ Photographers</h2>
            <p className="body-text text-lg text-muted max-w-2xl mx-auto">
              Be part of the largest community of camera gear enthusiasts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50 w-full"
              />
              <button className="px-6 py-3 bg-brand-primary hover:bg-[#2563EB] text-[#F8FAFC] rounded-lg font-semibold transition-colors duration-300 w-full sm:w-auto">
                Subscribe
              </button>
            </div>
            <p className="label-small text-muted">
              Get updates on new gear, exclusive deals, and community events
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
