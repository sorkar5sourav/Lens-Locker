import mongoose from 'mongoose';

const GearSchema = new mongoose.Schema({
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
    required: true 
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

// Use 'gears' collection (MongoDB will pluralize by default, but we explicitly set it)
export default mongoose.models.Gears || mongoose.model("Gears", GearSchema)