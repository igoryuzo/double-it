"use client"

import { useRouter } from 'next/navigation';
import { Metadata } from "next";
import { Button } from './ui/button';

const appUrl = process.env.NEXT_PUBLIC_URL || 'https://ca67-108-27-42-53.ngrok-free.app'; // Update to Vercel URL

export function generateMetadata({ searchParams }: { searchParams: { gameId?: string; pot?: string; challenge?: string } }): Metadata {
  const pot = searchParams.pot ?? '0.01';
  const challenge = searchParams.challenge ?? 'Unknown';
  const gameId = searchParams.gameId ?? '0xABC123';

  const frame = {
    version: "v2", // Explicitly use "v2" for clarity
    imageUrl: `${appUrl}/api/frame-image?pot=${encodeURIComponent(pot)}&challenge=${encodeURIComponent(challenge)}`, // Dynamic image
    button: {
      title: "View Challenge",
      action: {
        type: "launch_frame",
        name: "DoubleIt Share",
        url: `${appUrl}/start?gameId=${encodeURIComponent(gameId)}&pot=${encodeURIComponent(pot)}&challenge=${encodeURIComponent(challenge)}`, // Dynamic URL
        splashImageUrl: `${appUrl}/images/splash.png`,
        splashBackgroundColor: "#FFFFFF",
      },
    },
  };

  return {
    title: "Double It Share",
    openGraph: {
      title: "Double It Share",
      description: `Double it or withdraw it. Pot: ${pot} ETH, Challenge: @${challenge}`,
      images: [`${appUrl}/api/frame-image?pot=${encodeURIComponent(pot)}&challenge=${encodeURIComponent(challenge)}`],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Share() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[480px] space-y-4">
        <div className="space-y-2">
          <h1 className="text-[#414651] text-2xl font-medium">Challenge Created!</h1>
        </div>

        <Button
          className="w-full text-xl py-3 bg-[#0b89f4] hover:bg-[#0b89f4]/90 rounded-none h-[52px]"
          onClick={() => router.push('/')}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
