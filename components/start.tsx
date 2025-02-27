"use client"
import sdk from '@farcaster/frame-sdk';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, MoreHorizontal, Search } from "lucide-react";
import * as crypto from 'crypto';
// import { Metadata } from "next";

type FrameContext = {
  user?: {
    fid: number;
    username?: string;
    displayName?: string;
    pfpUrl?: string;
  };
};

// Export generateMetadata for /start route
// export function generateMetadata({ searchParams }: { searchParams: { gameId?: string; pot?: string; challenge?: string } }): Metadata {
//   const appUrl = process.env.NEXT_PUBLIC_URL || 'https://ca67-108-27-42-53.ngrok-free.app'; // Update to Vercel URL
//   const pot = searchParams.pot ?? '0.01'; // Pot value in USD
//   const challenge = searchParams.challenge ?? 'Unknown';
//   const gameId = searchParams.gameId ?? '0xABC123';
//   // Hardcode chain length for now (simulating 1 for start, update dynamically later)
//   const chainLength = '1';

//   const frame = {
//     version: "v2", // Use "v2" for Farcaster Frames V2
//     imageUrl: `${appUrl}/api/frame-image?pot=${encodeURIComponent(pot)}&challenge=${encodeURIComponent(challenge)}&chainLength=${encodeURIComponent(chainLength)}`, // Dynamic image
//     button: {
//       title: "Make Your Move",
//       action: {
//         type: "launch_frame",
//         name: "DoubleIt Action",
//         url: `${appUrl}/start?gameId=${encodeURIComponent(gameId)}&pot=${encodeURIComponent(pot)}&challenge=${encodeURIComponent(challenge)}`, // Points to an HTML page
//         splashImageUrl: `${appUrl}/images/splash.png`,
//         splashBackgroundColor: "#FFFFFF",
//       },
//     },
//   }

//   return {
//     title: "Double It Start",
//     openGraph: {
//       title: "Double It Start",
//       description: `Double it or withdraw it. Pot: $${pot}, Chain Length: ${chainLength}, Challenge: @${challenge}`,
//       images: [`${appUrl}/api/frame-image?pot=${encodeURIComponent(pot)}&challenge=${encodeURIComponent(challenge)}&chainLength=${encodeURIComponent(chainLength)}`],
//     },
//     other: {
//       "fc:frame": JSON.stringify(frame), // Single JSON object for Farcaster V2
//     },
//   };
// }

export default function StartChain() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{
    fid: number;
    username: string;
    display_name?: string;
    pfp_url?: string;
  }>>([]);
  const [selectedUser, setSelectedUser] = useState<{
    fid: number;
    username: string;
    display_name?: string;
    pfp_url?: string;
  } | null>(null);

  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };

    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_URL || window.location.origin;
        console.log('Base URL:', baseUrl);
        const response = await fetch(`${baseUrl}/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        setSearchResults(data.result.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (searchQuery.length > 0) {
      fetchUsers();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Simulate URL refresh on component mount
  useEffect(() => {
    const challenge = searchParams.get('challenge');
    const pot = searchParams.get('pot');
    const gameId = searchParams.get('gameId');
    
    if (challenge && pot && gameId) {
      const currentUrl = window.location.href;
      router.replace(currentUrl);
    }
  }, [router, searchParams]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }
  console.log(context);

  const startAndShare = async () => {
    if (!context || !selectedUser) {
      setFeedback("Please select a user to challenge");
      return;
    }

    setFeedback("Starting chain and preparing to share...");
    console.log(`Starting chain with 0.01 USD, challenging @${selectedUser.username}`);

    // Generate random game ID
    const gameId = crypto.randomBytes(8).toString('hex');

    // Create clean URL without any extra characters
    const shareUrl = `${process.env.NEXT_PUBLIC_URL}/start?gameId=${gameId}&pot=0.01&challenge=${selectedUser.username}`;
    // Remove trailing space but keep cursor at end
    const text = `I started a DoubleIt chain with 0.01 USD—@${selectedUser.username}, double it or withdraw it! ${shareUrl}`;
    const warpcastComposeUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&cursor=${text.length}`;

    try {
      await sdk.actions.openUrl(warpcastComposeUrl);
      setFeedback("Open Warpcast to share the challenge!");
    } catch (error) {
      console.error("Failed to open Warpcast compose:", error);
      setFeedback("Sharing failed—try again manually");
    }

    setTimeout(() => {
      setFeedback(null);
      router.push(`/share?gameId=${gameId}&pot=0.01&challenge=${encodeURIComponent(selectedUser.username)}`);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-white px-6 py-4 max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between mb-16">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <X className="w-5 h-5 text-[#556272]" />
        </button>
        <div className="text-center">
          <h1 className="text-xl font-medium text-[#556272]">DoubleIt</h1>
          <p className="text-sm text-[#8d97a0]">by igoryuzo.eth</p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="w-5 h-5 text-[#556272]" />
        </button>
      </header>

      <main className="flex flex-col gap-8">
        {/* Title */}
        <h2 className="text-[#0b89f4] text-4xl font-bold">Start a DoubleIt Chain</h2>

        {/* User Section */}
        <div className="space-y-2">
          <label className="text-[#556272] text-xl">User (Starting the chain)</label>
          <Card className="p-3 flex items-center gap-3 rounded-none">
            <Avatar className="h-8 w-8">
              <AvatarImage src={context?.user?.pfpUrl} />
              <AvatarFallback>{context?.user?.displayName?.slice(0, 2) ?? 'FC'}</AvatarFallback>
            </Avatar>
            <span className="text-[#556272]">@{context?.user?.username}</span>
          </Card>
        </div>

        {/* Amount Section */}
        <div className="space-y-2">
          <label className="text-[#556272] text-xl">Amount</label>
          <div className="relative">
            <Input type="text" defaultValue="0.01" className="pl-8 pr-16 py-3 text-xl border-[#0b89f4] rounded-none h-[52px]" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-[#556272]">$</span>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-[#556272]">USD</span>
          </div>
        </div>

        {/* Challenge User Section */}
        <div className="space-y-2">
          <label className="text-[#556272] text-xl">Challenge User</label>
          {selectedUser ? (
            <div className="flex items-center gap-2 border border-[#d5d7da] bg-white p-3 rounded-none">
              <Avatar className="h-8 w-8">
                <AvatarImage src={selectedUser.pfp_url} />
                <AvatarFallback>{selectedUser.display_name?.slice(0, 2) ?? selectedUser.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="flex-1 text-[#414651]">@{selectedUser.username}</span>
              <button className="pr-2" onClick={() => {
                setSelectedUser(null);
                setSearchQuery('');
              }}>
                <X className="h-5 w-5 text-[#8997a4]" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Farcaster users..."
                className="pl-10 pr-4 py-3 text-xl border-[#d5d7da] rounded-none h-[52px]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#556272]" />
              
              {searchResults.length > 0 && (
                <div className="absolute w-full bg-white border border-[#d5d7da] mt-1 max-h-60 overflow-y-auto z-10">
                  {searchResults.map((user) => (
                    <div
                      key={user.fid}
                      className="p-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedUser(user);
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.pfp_url} />
                        <AvatarFallback>{user.display_name?.slice(0, 2) ?? user.username.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-[#556272]">@{user.username}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {feedback && (
        <p className="text-sm text-[#0b89f4] animate-fade-in">
          {feedback}
        </p>
        )}

        {/* Start Button */}
        <Button
          className="w-full text-xl py-3 bg-[#0b89f4] hover:bg-[#0b89f4]/90 rounded-none h-[52px]"
          onClick={startAndShare}
          disabled={!selectedUser}
        >
          Start & Share
        </Button>
      </main>
    </div>
  );
}

