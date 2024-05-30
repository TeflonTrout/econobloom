import React, { useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI } from "../constants/contractABI";
import { CONTRACT_ADDRESS } from "../constants/contractAdress";
import { useSnackbar } from "../context/SnackbarContext";

interface MintButtonProps {
  userAddress: `0x${string}`;
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
    if (isPending) {
      showMessage(`Awaiting transaction...`);
    }

    if (isLoading) {
      showMessage(`Generating your ${plantType}...`);
    }

    if (isSuccess) {
      showMessage("Your seed has been sown!");
    }
  }, [isLoading, isSuccess, isPending]);

  return (
    <button
      onClick={() => {
        writeContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "safeMint",
          args: [userAddress, plantType],
        });
      }}
    >
      Mint NFT {plantType}
    </button>
  );
};
