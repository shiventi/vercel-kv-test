// app/api/kv/route.ts
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Generate a unique key and value for every request
    const key = `test-entry-${Date.now()}-${Math.random()}`;
    const value = { timestamp: new Date().toISOString() };
    
    // This is the billable operation.
    await kv.set(key, JSON.stringify(value));
    
    // Return a success message
    return NextResponse.json({ success: true, key: key }, { status: 200 });

  } catch (error) {
    // If something goes wrong, return an error
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to write to KV' }, { status: 500 });
  }
}