'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Gears from '@/models/Gear';

export async function addGearAction(formData) {
  // Check authentication with NextAuth
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    console.log('❌ Unauthorized: No session');
    throw new Error('Unauthorized - Please login first');
  }
  
  try {
    console.log(`📝 Adding gear for user: ${session.user.email}`);
    
    await connectDB();
    
    const gearData = {
      name: formData.get('name'),
      brand: formData.get('brand'),
      model: formData.get('model'),
      description: formData.get('description'),
      dailyRate: parseFloat(formData.get('dailyRate')),
      image: formData.get('image'),
      category: formData.get('category'),
      specifications: {
        resolution: formData.get('resolution'),
        sensor: formData.get('sensor'),
        iso: formData.get('iso'),
        weight: formData.get('weight'),
      },
      location: {
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: formData.get('zipCode'),
      },
      ownerId: session.user.email,
      isAvailable: true,
    };
    
    const gear = new Gears(gearData);
    await gear.save();
    
    console.log(`✅ Gear added successfully: ${gear._id}`);
    return { success: true, gearId: gear._id.toString() };
  } catch (error) {
    console.error('❌ Error adding gear:', error);
    throw new Error('Failed to add gear: ' + error.message);
  }
}

