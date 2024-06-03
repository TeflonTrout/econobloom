// Import necessary hooks and types from wagmi and other libraries
"use client";
import React, { useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ADDRESS } from "../constants/contractAddress";
import { CONTRACT_ABI } from "../constants/contractABI";
import { useSnackbar } from "../context/SnackbarContext";
import { Plant } from "../types/types";

interface EvolveButtonProps {
  readyToEvolve: boolean;
  tokenId: string; // Assuming tokenId is a string, adjust the type as necessary
  growPlant: () => void;
  updatePlant: () => void;
}

const EvolveButton: React.FC<EvolveButtonProps> = ({
  readyToEvolve,
  tokenId,
  growPlant,
  updatePlant,
}) => {
  const { showMessage } = useSnackbar();
  const { data: hash, isPending, writeContract } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isLoading) {
      showMessage("Attempting to Evolve...", true);
    }

    if (isSuccess) {
      growPlant();
      updatePlant;
    }
  }, [isLoading, isSuccess]);

  return (
    <button
      onClick={() => {
        writeContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "updateGrowthStage",
          args: [BigInt(tokenId)],
        });
      }}
      className={`font-bold flex justify-center items-center py-1 px-2 rounded w-1/2 ${
        readyToEvolve
          ? "bg-green-500 hover:bg-green-700 text-white"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
      disabled={!readyToEvolve}
    >
      {isPending ? "Evolving..." : "Evolve Plant"}
    </button>
  );
};

export default EvolveButton;
