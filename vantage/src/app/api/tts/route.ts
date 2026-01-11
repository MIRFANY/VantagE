import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, language } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const azureKey = process.env.AZURE_TTS_KEY;
    const azureRegion = process.env.AZURE_TTS_REGION;

    if (!azureKey || !azureRegion) {
      console.error('Missing Azure credentials:', { azureKey: !!azureKey, azureRegion: !!azureRegion });
      return NextResponse.json(
        { error: 'Azure TTS credentials not configured' },
        { status: 500 }
      );
    }

    // Select voice based on language
    const voice = language === 'urdu' ? 'ur-PK-AsadNeural' : 'en-US-AriaNeural';

    // SSML format for better control
    const ssml = `<speak version='1.0' xml:lang='${language === 'urdu' ? 'ur-PK' : 'en-US'}'>
      <voice name='${voice}'>
        ${text}
      </voice>
    </speak>`;

    console.log('TTS Request:', { region: azureRegion, voice, language });

    const response = await fetch(
      `https://${azureRegion}.tts.speech.microsoft.com/cognitiveservices/v1`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': azureKey,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
        },
        body: ssml,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Azure TTS Error:', response.status, errorText);
      return NextResponse.json(
        { error: `Azure TTS Error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    // Get audio buffer
    const audioBuffer = await response.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');

    return NextResponse.json({
      audio: `data:audio/mp3;base64,${audioBase64}`,
      success: true,
    });
  } catch (error) {
    console.error('Error in TTS:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to generate speech: ${errorMessage}` },
      { status: 500 }
    );
  }
}
