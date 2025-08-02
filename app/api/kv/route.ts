// app/api/kv/route.ts
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // just make a unique key for each req
    const key = `entry-${Date.now()}-${Math.random()}`;
    const val = { ts: new Date().toISOString() };
    
    // the actual write to the db
    await kv.set(key, JSON.stringify(val));
    
    // send back a success msg
    return NextResponse.json({ ok: true, key: key });

  } catch (err) {
    // if it breaks, log it and send an error
    console.error(err);
    return NextResponse.json({ ok: false, error: 'kv write failed' }, { status: 500 });
  }
}
