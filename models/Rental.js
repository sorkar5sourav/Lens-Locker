import mongoose from 'mongoose';

const RentalSchema = new mongoose.Schema(
  {
    gearId: {
      type: String,
      required: true,
    },
    gearName: {
      type: String,
      required: true,
    },
    gearImage: {
      type: String,
    },
    userId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    dailyRate: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'ongoing', 'completed', 'cancelled'],
      default: 'pending',
    },
    location: {
      city: String,
      state: String,
      zipCode: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Rental || mongoose.model('Rental', RentalSchema);
