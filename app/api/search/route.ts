import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";

const config = new Configuration({
  apiKey: process.env.NEYNAR_API_KEY || '',
});

const client = new NeynarAPIClient(config);

export async function GET(request: Request) {
  console.log('1. Request received:', request.url);
  console.log('2. API Key exists:', !!process.env.NEYNAR_API_KEY);
  console.log('3. API Key length:', process.env.NEYNAR_API_KEY?.length);

  if (!process.env.NEYNAR_API_KEY) {
    console.error('Missing Neynar API key');
    return new Response(JSON.stringify({ error: 'API key not configured' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  console.log('4. Search query:', query);

  if (!query) {
    return new Response(JSON.stringify({ result: { users: [] } }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    console.log('5. Making Neynar API request');
    const data = await client.searchUser({ q: query, limit: 10 });
    console.log('6. Neynar API response received');
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('7. Error details:', error);
    return new Response(JSON.stringify({ error: 'Failed to search users' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
