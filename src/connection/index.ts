import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

export const Base_SEPOLIA_ID = 84532;

// export const Lisk_SEPOLIA_ID = 4202;
// export const OPTIMISM_SEPOLIA_ID = 11155420;
// export const OPTIMISM_ID = 10;

// const OP_mainnet = {
//   chainId: OPTIMISM_ID,
//   name: "Optimism",
//   currency: "ETH",
//   explorerUrl: "https://explorer.optimism.io",
//   rpcUrl: import.meta.env.VITE_mainnet_rpc_url,
// };

// const OP_sepolia = {
//   chainId: OPTIMISM_SEPOLIA_ID,
//   name: "Optimism Sepolia",
//   currency: "ETH",
//   explorerUrl: "https://sepolia-optimistic.etherscan.io",
//   rpcUrl: import.meta.env.VITE_sepolia_rpc_url,
// };

// const Lisk_sepolia = {
//   chainId: Base_SEPOLIA_ID,
//   name: "Lisk Sepolia Testnet",
//   currency: "ETH",
//   explorerUrl: "https://blockscout.lisk.com/",
//   rpcUrl: import.meta.env.VITE_sepolia_rpc_url,
// };

const Base_sepolia = {
  chainId: Base_SEPOLIA_ID,
  name: "Base Sepolia Testnet",
  currency: "ETH",
  explorerUrl: "https://sepolia.basescan.org/",
  rpcUrl: import.meta.env.VITE_sepolia_rpc_url,
};

const metadata = {
  name: "CCP",
  description: "Content creator platform",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

export const configureWeb3Modal = () =>
  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [Base_sepolia],
    projectId: import.meta.env.VITE_projectId,
    enableAnalytics: false, // Optional - defaults
    themeVariables: {
      "--w3m-color-mix": "#9f51c6",
      "--w3m-color-mix-strength": 30,
      "--w3m-accent": "#006AFF",
      "--w3m-border-radius-master": "",
      "--w3m-font-size-master": "16",
    },
  });
