"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from "next/dynamic";
import posthog from "posthog-js";

const WagmiProvider = dynamic(() => import("./WagmiProvider"), {
  ssr: false,
});

const queryClient = new QueryClient();

// Add this console log temporarily
console.log("PostHog initialized:", {
  key: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  isInitialized: posthog.isFeatureEnabled !== undefined
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider>{children}</WagmiProvider>
    </QueryClientProvider>
  );
}
