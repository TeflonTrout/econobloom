import React, { useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI } from "../constants/contractABI";
import { CONTRACT_ADDRESS } from "../constants/contractAddress";
import { useSnackbar } from "../context/SnackbarContext";

interface MintButtonProps {
  userAddress: `0x${string}` | undefined;
  plantType: string; // Assuming you pass plantType as a prop
}

export const MintButton: React.FC<MintButtonProps> = ({
  userAddress,
  plantType,
}) => {
  const { showMessage } = useSnackbar();
  const { data: hash, isPending, writeContract } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (userAddress == undefined) {
      showMessage("Please Connect a Wallet.");
    } else {
      if (isPending) {
        showMessage(`Awaiting transaction...`);
      }
      if (isLoading) {
        showMessage(`Generating your ${plantType}...`);
      }
      if (isSuccess) {
        showMessage("Your seed has been sown!");
      }
    }
  }, [isLoading, isSuccess, isPending]);

  return (
    <button
      onClick={() => {
        if (userAddress == undefined) {
          showMessage("Please Connect a Wallet.");
        }
        writeContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "safeMint",
          args: [userAddress!, plantType],
        });
      }}
      className="min-w-[150px] max-w-[200px] bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      Mint {plantType}
    </button>
  );
};
