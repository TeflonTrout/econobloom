"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { base, mainnet, goerli } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const config = getDefaultConfig({
  appName: "Econobloom",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConvexProvider client={convex}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </ConvexProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
