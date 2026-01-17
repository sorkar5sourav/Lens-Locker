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

export async function GET() {
  try {
    await connectDB();
    const gear = await Gear.find({ isAvailable: true })
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(gear, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching gear:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gear' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
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

