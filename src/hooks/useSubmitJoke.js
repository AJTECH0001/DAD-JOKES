import { useState } from "react";
import { sepolia } from "viem/chains";

export function useSubmitJoke(walletClient, dadJokesContract) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (setup, punchline) => {
    try {
      const address = await walletClient.getAddress();
      await walletClient.switchChain({ id: sepolia.id });

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
