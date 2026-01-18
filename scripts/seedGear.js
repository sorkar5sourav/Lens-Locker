#!/usr/bin/env node

/**
 * Seed script to populate MongoDB with gear data from cameras.json
 * Run: node scripts/seedGear.js
 */

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI?.trim();

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not defined in .env.local');
  process.exit(1);
}

// Define Gear Schema inline
const gearSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  description: { type: String, required: true },
  dailyRate: { type: Number, required: true },
  image: { type: String, required: true },
  images: [String],
  category: {
    type: String,
    enum: ['DSLR', 'Mirrorless', 'Drones', 'Lighting', 'Lenses', 'Accessories'],
    required: true,
  },
  specifications: {
    resolution: String,
    sensor: String,
    iso: String,
    weight: String,
    video: String,
  },
  location: {
    city: String,
    state: String,
    zipCode: String,
  },
  ownerId: { type: String, default: 'admin' },
  isAvailable: { type: Boolean, default: true },
}, {
  timestamps: true,
});

const Gear = mongoose.model('gears', gearSchema);

async function seedGear() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Read cameras.json
    const cameraDataPath = path.join(__dirname, '../data/cameras.json');
    const cameraData = JSON.parse(fs.readFileSync(cameraDataPath, 'utf-8'));
    console.log(`📖 Loaded ${cameraData.length} items from cameras.json`);

    // Clear existing gear
    await Gear.deleteMany({});
    console.log('🗑️  Cleared existing gear');

    // Insert camera data
    const result = await Gear.insertMany(cameraData);
    console.log(`✅ Seeded ${result.length} gear items to MongoDB`);

    // Verify
    const count = await Gear.countDocuments();
    console.log(`📊 Total gear in database: ${count}`);

    // Show first item
    const firstItem = await Gear.findOne();
    console.log('\n📦 Sample item:');
    console.log(JSON.stringify(firstItem, null, 2));

    await mongoose.connection.close();
    console.log('\n✅ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedGear();
