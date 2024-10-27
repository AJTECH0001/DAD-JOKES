export function useWithdraw(dadJokesContract, walletClient, publicClient) {
  async function handleWithdraw() {
    try {
      const [address] = await walletClient.requestAddresses();
      await walletClient.switchChain({ id: sepolia.id });

      // Check balance before attempting withdrawal
      const balance = await dadJokesContract.read.creatorBalances([address]);

      if (balance === 0) {
        throw new Error("No balance to withdraw");
      }

      const { request } = await publicClient.simulateContract({
        address: dadJokesContract.address,
        abi: dadJokesContract.abi,
        functionName: "withdrawBalance",
        account: address,
      });
      await walletClient.writeContract(request);
    } catch (error) {
      console.error("Withdraw error:", error.message);
      alert(error.message);
    }
  }

  return { handleWithdraw };
}
