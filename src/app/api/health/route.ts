import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Elixir Victoria UI',
      version: '1.0.0',
    },
    { status: 200 }
  )
} 