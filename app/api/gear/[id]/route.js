import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Gear from '@/models/Gear';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const gear = await Gear.findById(params.id).lean();
    
    if (!gear) {
      return NextResponse.json(
        { error: 'Gear not found' },
        { status: 404, headers: corsHeaders }
      );
    }
    
    return NextResponse.json(gear, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching gear:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gear' },
      { status: 500, headers: corsHeaders }
    );
  }
}

