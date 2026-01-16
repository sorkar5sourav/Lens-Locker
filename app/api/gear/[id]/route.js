import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Gear from '@/models/Gear';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const gear = await Gear.findById(params.id).lean();
    
    if (!gear) {
      return NextResponse.json(
        { error: 'Gear not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(gear);
  } catch (error) {
    console.error('Error fetching gear:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gear' },
      { status: 500 }
    );
  }
}

