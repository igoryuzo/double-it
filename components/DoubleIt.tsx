"use client";

import { useFrame } from "./context/FrameContext";
import { useSignIn } from "@/hooks/use-sign-in";
import { useUser } from "@/hooks/use-user-me";
import { useEffect, useState } from "react";
import { useUpdateUser } from "@/hooks/use-update-user";
import { X, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function DoubleIt() {
  const { isSDKLoaded, safeAreaInsets, context, error: frameError } = useFrame();
  const { signIn, logout, isSignedIn, isLoading, error: signInError } = useSignIn();
  const { data: user, refetch: refetchUser } = useUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const [customName, setCustomName] = useState("");

  console.log("Safe area insets:", safeAreaInsets);
  console.log("Sign In", signIn);
  console.log("Logout", logout);
  console.log("Is loading", isLoading);
  console.log("Update user", updateUser);
  console.log("Set Custom Name", setCustomName);
  console.log("Is updating", isUpdating);
  console.log("Custom name", customName);
  console.log("Frame SDK loaded:", isSDKLoaded);
  console.log("Frame context:", context);
  console.log("Frame error:", frameError);
  console.log("SignIn error:", signInError);
  console.log("Current isSignedIn state:", isSignedIn);
  console.log("Current user data:", user);

  console.log("[SERVER] NEXT_PUBLIC_URL:", process.env.NEXT_PUBLIC_URL);
  
  useEffect(() => {
    refetchUser();
  }, [isSignedIn, refetchUser]);

  if (!isSDKLoaded) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-2">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        Loading...
      </div>
    );
  }

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

      {/* Main Content */}
      <main className="flex flex-col items-center text-center">
        <div className="space-y-2 mb-8">
          <h2 className="text-[#0b89f4] text-5xl font-bold">DoubleIt</h2>
          <p className="text-[#0b89f4] text-xl">A social game to double the pot.</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 w-full max-w-sm mb-[18px]">
          <Link href="/start" className="flex-1">
            <Button className="w-full text-2xl py-8 bg-[#0b89f4] hover:bg-[#0b89f4]/90 rounded-none font-normal">
              Start
            </Button>
          </Link>
          <Link href="/learn" className="flex-1">
            <Button variant="outline" className="w-full text-2xl py-8 text-[#0b89f4] border-[#0b89f4] rounded-none font-normal hover:bg-[#0b89f4]/5">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Description */}
        <p className="text-[#556272] text-lg max-w-sm mb-[36px]">
          Start a DoubleIt chain with as little as $0.01 and challenge your friends to double it, pass it or withdraw
          it.
        </p>

        {/* Farcaster Logo */}
        <div className="w-20 h-20 mb-6">
          <Image
            src="/images/farcaster-logo.png"
            alt="Farcaster Logo"
            width={80}
            height={80}
            className="w-full h-full"
          />
        </div>

        {/* Farcaster Text */}
        <div className="space-y-1 mb-8">
          <p className="text-xl">
            <span className="text-[#0b89f4]">Farcaster</span>
            <span className="text-[#556272]"> has a high quality</span>
          </p>
          <p className="text-xl text-[#556272]">social graph. Lets see if we can</p>
          <p className="text-xl text-[#556272]">do some good with a fun game.</p>
        </div>

        {/* Footer */}
        <footer className="space-y-1">
          <p className="text-[#556272] text-lg">Any Questions?</p>
          <p className="text-[#8d97a0]">DC @igoryuzo.eth</p>
        </footer>
      </main>
    </div>
  );
}
