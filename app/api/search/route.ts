import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";

const config = new Configuration({
  apiKey: process.env.NEYNAR_API_KEY || '',
});

const client = new NeynarAPIClient(config);

export async function GET(request: Request) {
  if (!process.env.NEYNAR_API_KEY) {
    console.error('Missing Neynar API key');
    return new Response(JSON.stringify({ error: 'API key not configured' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return new Response(JSON.stringify({ result: { users: [] } }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const data = await client.searchUser({ q: query, limit: 10 });
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to search users' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
