"use client"

import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function Share() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[480px] space-y-4">
        <div className="space-y-2">
          <h1 className="text-[#414651] text-2xl font-medium">Challenge Created!</h1>
          <p className="text-[#556272]">Share this post on Warpcast to start the game.</p>
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
