import { NextRequest, NextResponse } from 'next/server';
import { updateHotelScore } from '@/lib/db/hotel-repository';
import { validateScores } from '@/lib/scoring';
import { ScoreAssessment } from '@/types/score';

export const runtime = 'edge';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const breakdown = {
      bedComfort: body.bedComfortScore,
      quietness: body.quietnessScore,
      lightingClimate: body.lightingClimateScore,
      designWellness: body.designWellnessScore,
    };

    const validation = validateScores(breakdown);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.errors.join(' ') },
        { status: 400 }
      );
    }

    const assessment: ScoreAssessment = {
      hotelId: params.id,
      bedComfortScore: body.bedComfortScore,
      quietnessScore: body.quietnessScore,
      lightingClimateScore: body.lightingClimateScore,
      designWellnessScore: body.designWellnessScore,
      weightedRestScore: body.weightedRestScore,
      confidenceLevel: body.confidenceLevel || 'High (On-Site Verified)',
      evidenceNotes: body.evidenceNotes || 'Assessor updated scores.',
      assessmentDate: body.assessmentDate || new Date().toISOString().slice(0, 10),
      assessorId: body.assessorId || 'lead-assessor',
      assessorName: body.assessorName || 'Lead Sleep Acoustician',
      status: body.status || 'published',
      createdAt: new Date().toISOString(),
    };

    const updatedHotel = await updateHotelScore(params.id, assessment, assessment.assessorId);
    if (!updatedHotel) {
      return NextResponse.json(
        { success: false, error: 'Property not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      hotel: updatedHotel,
      restScore: updatedHotel.restScore,
    });
  } catch (err: unknown) {
    console.error('[Score API Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to process score update.' },
      { status: 500 }
    );
  }
}
