// Import necessary hooks and types from wagmi and other libraries
"use client";
import React, { useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ADDRESS } from "../constants/contractAdress";
import { CONTRACT_ABI } from "../constants/contractABI";
import { useSnackbar } from "../context/SnackbarContext";
import { Plant } from "../types/types";

interface EvolveButtonProps {
  plant: Plant;
  tokenId: string; // Assuming tokenId is a string, adjust the type as necessary
  growPlant: () => void;
}

const EvolveButton: React.FC<EvolveButtonProps> = ({
  plant,
  tokenId,
  growPlant,
}) => {
  const { showMessage } = useSnackbar();
  const { data: hash, isPending, writeContract } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isLoading) {
      showMessage("Attempting to Evolve...");
    }

    if (isSuccess) {
      growPlant();
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
        plant.ready_to_evolve
          ? "bg-green-500 hover:bg-green-700 text-white"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
      disabled={!plant.ready_to_evolve}
    >
      {isPending ? "Evolving..." : "Evolve Plant"}
    </button>
  );
};

export default EvolveButton;
