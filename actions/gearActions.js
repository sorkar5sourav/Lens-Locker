'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import Gear from '@/models/Gear';
import { revalidatePath } from 'next/cache';

export async function addGearAction(formData) {
  // Check authentication
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  
  if (!session || session.value !== 'true') {
    throw new Error('Unauthorized');
  }
  
  try {
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
    };
    
    const gear = new Gear(gearData);
    await gear.save();
    
    revalidatePath('/gear');
    redirect('/gear');
  } catch (error) {
    throw new Error('Failed to add gear: ' + error.message);
  }
}

