// app/api/kv/route.ts
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const key = `entry-${Date.now()}-${Math.random()}`;
    const val = { ts: new Date().toISOString() };
    
    // this "magic" kv object will now work because we are going to fix the environment variables
    await kv.set(key, JSON.stringify(val));
    
    return NextResponse.json({ success: true, key: key });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'kv write failed', details: (err as Error).message }, { status: 500 });
  }
}