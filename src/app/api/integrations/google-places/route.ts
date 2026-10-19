import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const placeId = searchParams.get('placeId');
    const hotelName = searchParams.get('hotelName') || 'Hotel';

    if (!placeId) {
      return NextResponse.json(
        { success: false, error: 'Google Place ID is required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_MAPS_SERVER_API_KEY;

    // Graceful unconfigured state
    if (!apiKey || apiKey.includes('Placeholder')) {
      return NextResponse.json({
        success: true,
        configured: false,
        message: 'Google Maps Server API Key is not configured. Falling back to direct profile link.',
        data: {
          placeId,
          mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelName)}&query_place_id=${placeId}`,
          rating: null,
          userRatingsTotal: null,
          attribution: 'Google Maps Platform',
        },
      });
    }

    // Call Google Maps Platform Places Details API (New/Current API format)
    // Only fetch permitted basic fields: rating, user_ratings_total, url
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,url&key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache 1 hour
    const json = await res.json();

    if (json.status !== 'OK' || !json.result) {
      return NextResponse.json({
        success: true,
        configured: true,
        status: json.status,
        data: {
          placeId,
          mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelName)}&query_place_id=${placeId}`,
          rating: null,
          userRatingsTotal: null,
          attribution: 'Google Maps Platform',
        },
      });
    }

    return NextResponse.json({
      success: true,
      configured: true,
      data: {
        placeId,
        mapsUrl: json.result.url,
        rating: json.result.rating,
        userRatingsTotal: json.result.user_ratings_total,
        attribution: 'Google Maps Platform',
      },
    });
  } catch (err: unknown) {
    console.error('[Google Places API Integration Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Error connecting to Google Places gateway.' },
      { status: 500 }
    );
  }
}
