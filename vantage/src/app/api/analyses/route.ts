import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Analysis } from '@/lib/models/Analysis';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { text, summary, meaning, poeticDevices, themes, emotionalTone, historicalContext, wordAnalysis, interpretation, englishTranslation } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const analysis = new Analysis({
      text,
      summary,
      meaning,
      poeticDevices,
      themes,
      emotionalTone,
      historicalContext,
      wordAnalysis,
      interpretation,
      englishTranslation,
    });

    await analysis.save();

    return NextResponse.json(
      { message: 'Analysis saved successfully', analysis },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving analysis:', error);
    return NextResponse.json(
      { error: 'Failed to save analysis' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const analysis = await Analysis.findById(id);
      if (!analysis) {
        return NextResponse.json(
          { error: 'Analysis not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(analysis);
    }

    const analyses = await Analysis.find().sort({ createdAt: -1 });
    return NextResponse.json(analyses);
  } catch (error) {
    console.error('Error retrieving analyses:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve analyses' },
      { status: 500 }
    );
  }
}
