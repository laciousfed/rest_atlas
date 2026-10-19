import { NextRequest, NextResponse } from 'next/server';
import { getHotels, createHotel } from '@/lib/db/hotel-repository';
import { HotelFilterOptions } from '@/types/hotel';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const filters: HotelFilterOptions = {
      query: searchParams.get('query') || undefined,
      continent: searchParams.get('continent') || undefined,
      country: searchParams.get('country') || undefined,
      city: searchParams.get('city') || undefined,
      settingType: searchParams.get('settingType') || undefined,
      category: searchParams.get('category') || undefined,
      minRestScore: searchParams.get('minRestScore') ? parseFloat(searchParams.get('minRestScore')!) : undefined,
      minBedComfort: searchParams.get('minBedComfort') ? parseFloat(searchParams.get('minBedComfort')!) : undefined,
      minQuietness: searchParams.get('minQuietness') ? parseFloat(searchParams.get('minQuietness')!) : undefined,
      sortBy: (searchParams.get('sortBy') as HotelFilterOptions['sortBy']) || 'restScore',
      blackoutCurtains: searchParams.get('blackoutCurtains') === 'true',
      soundproofing: searchParams.get('soundproofing') === 'true',
      pillowSelection: searchParams.get('pillowSelection') === 'true',
      adultsOnly: searchParams.get('adultsOnly') === 'true',
      spaWellness: searchParams.get('spaWellness') === 'true',
      featuredOnly: searchParams.get('featuredOnly') === 'true',
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 9,
    };

    const result = await getHotels(filters);
    return NextResponse.json({ success: true, ...result });
  } catch (err: unknown) {
    console.error('[API /hotels GET Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve hotels' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.city || !body.country) {
      return NextResponse.json(
        { success: false, error: 'Name, City, and Country are required.' },
        { status: 400 }
      );
    }

    const created = await createHotel(body, 'admin-assessor');
    return NextResponse.json({ success: true, hotel: created }, { status: 201 });
  } catch (err: unknown) {
    console.error('[API /hotels POST Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to create hotel listing.' },
      { status: 500 }
    );
  }
}
