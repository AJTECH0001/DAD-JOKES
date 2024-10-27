import { sepolia } from "viem/chains";
import { parseEther } from "viem/utils";

export function useVote(dadJokesContract, walletClient, publicClient) {
  async function handleVote(index, type) {
    const reward = type + 1;

    const [address] = await walletClient.requestAddresses();
    await walletClient.switchChain({ id: sepolia.id });

    let rewardAmount;
    switch (type) {
      case 0:
        rewardAmount = parseEther("0.001");
        break;
      case 1:
        rewardAmount = parseEther("0.005");
        break;
      case 2:
        rewardAmount = parseEther("0.01");
        break;
      default:
        throw new Error("Invalid reward type");
    }

    const { request } = await publicClient.simulateContract({
      address: dadJokesContract.address,
      abi: dadJokesContract.abi,
      functionName: "rewardJoke",
      args: [index, reward],
      account: address,
      value: rewardAmount,
    });

    await walletClient.writeContract(request);
  }

  return { handleVote }; // Return as an object
}
