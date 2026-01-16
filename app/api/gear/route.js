import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Gear from '@/models/Gear';

export async function GET() {
  try {
    await connectDB();
    const gear = await Gear.find({ isAvailable: true })
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(gear);
  } catch (error) {
    console.error('Error fetching gear:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gear' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const gear = new Gear(data);
    await gear.save();
    
    return NextResponse.json(gear, { status: 201 });
  } catch (error) {
    console.error('Error creating gear:', error);
    return NextResponse.json(
      { error: 'Failed to create gear' },
      { status: 500 }
    );
  }
}

