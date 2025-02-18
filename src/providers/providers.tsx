import { http, WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import React from "react";

const projectId = import.meta.env.VITE_PROJECT_ID as string;
const config = getDefaultConfig({
  appName: "Cytric Assessment",
  projectId: projectId,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http("https://ethereum-sepolia.publicnode.com"),
  },
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
