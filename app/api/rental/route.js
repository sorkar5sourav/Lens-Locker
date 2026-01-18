import connectDB from '@/lib/db';
import Rental from '@/models/Rental';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { rentals } = body;

    if (!rentals || !Array.isArray(rentals) || rentals.length === 0) {
      return Response.json(
        { success: false, message: 'No rental items provided' },
        { status: 400 }
      );
    }

    // Validate rental data
    const requiredFields = ['gearId', 'email', 'name', 'phone', 'startDate', 'endDate', 'duration', 'dailyRate', 'totalPrice'];
    for (const rental of rentals) {
      for (const field of requiredFields) {
        if (!rental[field]) {
          return Response.json(
            { success: false, message: `Missing required field: ${field}` },
            { status: 400 }
          );
        }
      }
    }

    // Create rental records
    const createdRentals = await Rental.insertMany(rentals);

    return Response.json(
      {
        success: true,
        message: 'Rental order(s) created successfully',
        data: createdRentals,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating rental:', error);
    return Response.json(
      { success: false, message: error.message || 'Error creating rental order' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const status = searchParams.get('status');

    let query = {};
    if (email) query.email = email;
    if (status) query.status = status;

    const rentals = await Rental.find(query).sort({ createdAt: -1 }).lean();

    return Response.json(
      {
        success: true,
        data: rentals,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching rentals:', error);
    return Response.json(
      { success: false, message: error.message || 'Error fetching rentals' },
      { status: 500 }
    );
  }
}
