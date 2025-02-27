import dynamic from "next/dynamic";
import { Metadata } from "next";
import * as crypto from 'crypto';

const StartChain = dynamic(() => import("@/components/start"));

export async function generateMetadata({ searchParams }: { 
  searchParams: { pot?: string; challenge?: string } 
}): Promise<Metadata> {
  const params = await Promise.resolve(searchParams);
  const pot = params.pot ?? '0.01';
  const challenge = params.challenge ?? 'Unknown';
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const gameId = crypto.randomBytes(8).toString('hex');

  const frameImage = `${baseUrl}/api/frame-image?gameId=${gameId}&pot=${pot}&challenge=${challenge}`;
  
  return {
    title: "Double It Challenge",
    description: `Challenge ${challenge} to Double It!`,
    // Frame metadata must be in this exact order
    other: {
      'fc:frame': 'vNext',
      'fc:frame:image': frameImage,
      'fc:frame:button:1': 'Make Your Move',
      'fc:frame:post_url': `${baseUrl}/api/move?gameId=${gameId}`,
      'fc:frame:aspect_ratio': '1.91:1'
    },
    // OpenGraph fallback
    openGraph: {
      title: "Double It Challenge",
      description: `Challenge ${challenge} to Double It!`,
      images: [frameImage],
    }
  };
}

export default function Page() {
  return <StartChain />;
}