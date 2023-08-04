import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { VenlyConnector } from "@venly/wagmi-connector";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { bscTestnet } from "wagmi/chains";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bscTestnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new MetaMaskConnector({ chains }),
    new VenlyConnector({
      chains,
      options: {
        clientId: "2c81c239-6c49-4d70-a087-d10dca892d9b",
        environment: "sandbox",
      },
    }),
  ],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
