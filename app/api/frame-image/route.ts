/** @jsxRuntime automatic */
/** @jsxImportSource react */

import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import * as React from 'react';

export const runtime = 'edge';

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const pot = searchParams.get('pot') || '0.01';
  const challenge = searchParams.get('challenge') || 'Unknown';

  try {
    return new ImageResponse(
      React.createElement('div', {
        style: {
          width: '1200px',
          height: '630px',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px'
        }
      }, `Double It - Loading ${pot} ${challenge}...`),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, immutable, no-transform, max-age=60',
        }
      }
    ) as Response;
  } catch (error) {
    console.error("Dynamic image generation failed:", error);
    return new ImageResponse(
      React.createElement('div', {
        style: {
          width: '1200px',
          height: '630px',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px'
        }
      }, 'Double It - Loading...'),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, immutable, no-transform, max-age=60',
        }
      }
    ) as Response;
  }
}