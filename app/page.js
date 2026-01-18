import HeroSection from '@/components/HeroSection';
import Brands from '@/components/Home/Brands';
import HowItWorks from '@/components/Home/HowItWorks';
import Featured from '@/components/Home/Featured';
import Trending from '@/components/Home/Trending';
import WhyLensLocker from '@/components/Home/WhyLensLocker';
import Community from '@/components/Home/Community';
import connectDB from '@/lib/db';
import Gear from '@/models/Gear';

async function getTrendingGear() {
  try {
    await connectDB();
    const gear = await Gear.find({ isAvailable: true })
      .sort({ createdAt: -1 })
      .limit(8)
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
      <HeroSection 
        title="Rent the Gear. Shoot the Vision."
        subtitle="Connect with photographers worldwide and access professional camera equipment at unbeatable prices"
        cta="Browse Gear"
        ctaLink="/gear"
      />
      <Brands />
      <HowItWorks />
      <Featured />
      <Trending trendingGear={trendingGear} />
      <WhyLensLocker />
      <Community />
    </div>
  );
}
