import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Gear from '@/models/Gear';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request) {
  try {
    await connectDB();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Query gear with pagination
    const gear = await Gear.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Get total count for pagination
    const total = await Gear.countDocuments(filter);
    
    console.log(`📦 API: Loaded ${gear.length} items (page ${page}, search: ${search || 'none'}, category: ${category || 'all'})`);
    
    // Convert to plain objects
    const convertedGear = gear.map(item => ({
      ...item,
      _id: item._id?.toString() || item._id,
      createdAt: item.createdAt?.toISOString() || item.createdAt,
      updatedAt: item.updatedAt?.toISOString() || item.updatedAt,
    }));
    
    return NextResponse.json(
      {
        data: convertedGear,
        total,
        page,
        limit,
        hasMore: skip + limit < total,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('❌ API Error fetching gear:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gear', details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const gearsCollection = db.collection("gears");

    const data = await request.json();
    const gear = new Gear(data);
    await gear.save();
    
    return NextResponse.json(gear, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error('Error creating gear:', error);
    return NextResponse.json(
      { error: 'Failed to create gear' },
      { status: 500, headers: corsHeaders }
    );
  }
}

