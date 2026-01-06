import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const prompt = `You are an expert literary analyst specializing in Urdu poetry and prose. Analyze the following Urdu text and provide a comprehensive decoding:

TEXT: "${text}"

Please provide your analysis in the following JSON format:
{
  "summary": "A brief overview of the text",
  "meaning": "The literal and figurative meanings",
  "poeticDevices": ["List of poetic devices used (e.g., metaphor, alliteration, simile, personification)"],
  "themes": ["Main themes explored in the text"],
  "emotionalTone": "The emotional tone and mood",
  "historicalContext": "Any relevant historical or cultural context",
  "wordAnalysis": {
    "key_word_1": "meaning and significance",
    "key_word_2": "meaning and significance"
  },
  "interpretation": "Deeper interpretation and literary significance",
  "englishTranslation": "A poetic English translation if applicable"
}

Provide thoughtful, insightful analysis that helps readers appreciate the beauty and depth of Urdu literature.`;

    const message = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText =
      message.choices[0].message.content || '';

    // Parse the JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    const analysis = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error analyzing text:', error);
    return NextResponse.json(
      { error: 'Failed to analyze text. Please try again.' },
      { status: 500 }
    );
  }
}
