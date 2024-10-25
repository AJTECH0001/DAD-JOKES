"use client";

import { useWallet } from "@/hooks/useWallet";
import ConnectButton from "@/components/ConnectButton";
import React, { useState, useEffect } from "react";
import { ConnectWalletClient, ConnectPublicClient } from "@/lib/client";
import { getContract } from "viem";
import dadJokesABI from "@/lib/dadJokesABI.json";
// Component to display the wallet status (connected or disconnected)
export default function WalletButton() {
  const [publicClient, setPublicClient] = useState(null);
  const [walletClient, setWalletClient] = useState(null);
  const [dadJokesContract, setDadJokesContract] = useState(null);
  const { address, balance, handleClick } = useWallet(dadJokesContract);

  useEffect(() => {
    const initializeClients = async () => {
      try {
        const publicClient = await ConnectPublicClient();
        const walletClient = await ConnectWalletClient();
        setPublicClient(publicClient);
        setWalletClient(walletClient);
      } catch (error) {
        console.error("Error initializing clients:", error);
      }
    };
    initializeClients();
  }, []);

  useEffect(() => {
    if (publicClient && walletClient) {
      const dadJokesContract = getContract({
        address: "0xe43e44f3f538Ad10292C5FBE52542aB0D7740599",
        abi: dadJokesABI,
        client: { public: publicClient, wallet: walletClient },
      });

      setDadJokesContract(dadJokesContract);
    }
  }, [publicClient, walletClient]);

  if (!address) {
    // If no address is provided, display "Disconnected" status
    return <ConnectButton Button handleClick={handleClick} />;
  }
  return (
    <>
      <div>Connected</div>
    </>
  );
}
