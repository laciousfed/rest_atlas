import { NextRequest, NextResponse } from 'next/server';
import { getHotelById, updateHotel } from '@/lib/db/hotel-repository';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const hotel = await getHotelById(params.id);
    if (!hotel) {
      return NextResponse.json(
        { success: false, error: 'Hotel not found.' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, hotel });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hotel.' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updated = await updateHotel(params.id, body, 'admin-assessor');
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Hotel not found or could not be updated.' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, hotel: updated });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Failed to update hotel.' },
      { status: 500 }
    );
  }
}
