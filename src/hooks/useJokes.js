"use client";

import { useEffect, useState } from "react";
import { ConnectPublicClient } from "@/lib/client";
import { getContract } from "viem";
import dadJokesABI from "@/lib/dadJokesABI.json";

const publicClient = ConnectPublicClient();
const dadJokesContract = getContract({
  address: "0x0228C786A3A7d55C8f70433722FFCEcCb7a62D80",
  abi: dadJokesABI,
  client: { public: publicClient },
});

export const useJokes = () => {
  // Specify the type of the state
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        // Specify the type of the fetched jokes
        const fetchedJokes = await dadJokesContract.read.getJokes();
        setJokes(fetchedJokes);
      } catch (error) {
        console.error("Error fetching jokes:", error);
      }
    };
    fetchJokes();
  }, []);

  return jokes;
};
