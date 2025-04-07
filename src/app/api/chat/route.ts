import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Опционально: для использования Edge Runtime

export async function POST(request: Request) {
  const { messages } = await request.json();

  // Валидация входных данных
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json(
      { error: 'Invalid messages format' },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error('API key is not configured');
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('DeepSeek API Error:', errorData);
      return NextResponse.json(
        { error: errorData.error?.message || 'API request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}