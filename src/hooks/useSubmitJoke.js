import { useState } from "react";
import { sepolia } from "viem/chains";

export function useSubmitJoke(walletClient, dadJokesContract) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (setup, punchline) => {
    // Retrieve the wallet address using the Wallet Client
    const [address] = await walletClient.requestAddresses();
    await walletClient.switchChain({ id: sepolia.id });

    try {
      const tx = await walletClient.writeContract({
        address: dadJokesContract.address,
        abi: dadJokesContract.abi,
        functionName: "addJoke",
        args: [setup, punchline],
        account: address,
      });
      await tx.wait();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting joke:", error);
    }
  };

  return { isModalOpen, setIsModalOpen, handleSubmit };
}
