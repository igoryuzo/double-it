import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const amount = searchParams.get('amount') || '0.01';
  const chainLength = searchParams.get('chainLength') || '1';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
          gap: '24px',
        }}
      >
        {/* 2X Logo in top right */}
        <div style={{ 
          position: 'absolute', 
          top: '24px', 
          right: '24px',
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#000'
        }}>
          2X
        </div>

        {/* Main Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#000'
          }}>
            Current Pot: ${amount}
          </div>
          
          <div style={{
            fontSize: '32px',
            color: '#414651'
          }}>
            Chain Length: {chainLength}
          </div>
          
          <div style={{
            fontSize: '24px',
            color: '#556272',
            textDecoration: 'underline'
          }}>
            Track on Basescan ↗
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
} 