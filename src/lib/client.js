import { createWalletClient, createPublicClient, custom, http } from "viem";
import { sepolia } from "viem/chains";

export async function ConnectWalletClient() {
  // Check if we're in a browser environment and if MetaMask is installed
  if (typeof window !== "undefined" && window.ethereum) {
    const transport = custom(window.ethereum);

    // Create the wallet client with the Sepolia chain and custom transport
    const walletClient = createWalletClient({
      chain: sepolia,
      transport: transport,
    });

    return walletClient;
  } else {
    console.warn("MetaMask not detected");
    return null;
  }
}

export function ConnectPublicClient() {
  // Create the public client for Sepolia using HTTP transport
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http("https://rpc.sepolia.org"),
  });

  return publicClient;
}
