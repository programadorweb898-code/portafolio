import { NextRequest, NextResponse } from 'next/server';

const backendUrl = process.env.CONVERSATION_MEMORY_DEMO_URL;

export async function POST(request: NextRequest) {
  if (!backendUrl) {
    return NextResponse.json(
      { error: 'Demo backend is not configured.' },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const action = payload.action;

  let endpoint: string;
  let requestBody: Record<string, unknown>;

  if (action === 'session') {
    endpoint = '/demo/session';
    requestBody = {};
  } else if (action === 'search') {
    if (typeof payload.demoId !== 'string' || typeof payload.query !== 'string') {
      return NextResponse.json({ error: 'Invalid search request.' }, { status: 400 });
    }

    endpoint = '/demo/search';
    requestBody = {
      demoId: payload.demoId,
      query: payload.query,
    };
  } else {
    return NextResponse.json({ error: 'Unknown demo action.' }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(`${backendUrl.replace(/\/$/, '')}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      cache: 'no-store',
      signal: controller.signal,
    });

    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') ?? 'application/json',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Demo backend unavailable.' },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
