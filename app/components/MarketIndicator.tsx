import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { InfuraProvider } from "ethers";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/16/solid";
import { MARKET_CONTRACT_ADDRESS } from "../constants/marketContractAddress";
import { MARKET_CONTRACT_ABI } from "../constants/marketContractABI";

const MarketIndicator = () => {
  const [marketCondition, setMarketCondition] = useState<string>("Loading...");

  useEffect(() => {
    const fetchRSI = async () => {
      const provider = new InfuraProvider("sepolia", process.env.INFURA_KEY);
      const contract = new ethers.Contract(
        MARKET_CONTRACT_ADDRESS,
        MARKET_CONTRACT_ABI,
        provider
      );

      try {
        const rsiValue = await contract.getRSI();
        determineMarketCondition(parseFloat(ethers.formatUnits(rsiValue, 0)));
      } catch (error) {
        console.error("Error fetching RSI:", error);
        setMarketCondition("Error");
      }
    };

    fetchRSI();
  }, []);

  const determineMarketCondition = (rsi: number) => {
    if (rsi > 60) {
      setMarketCondition("Fast Growth");
    } else if (rsi < 40) {
      setMarketCondition("Slow Growth");
    } else {
      setMarketCondition("Normal Growth");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-x-2 bg-gray-700 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold">Market Condition:</h2>
      <p
        className={`flex w-full justify-center items-center gap-2 text-xl font-bold ${
          marketCondition === "Fast Growth"
            ? "text-green-500"
            : marketCondition === "Slow Growth"
            ? "text-red-500"
            : "text-yellow-500"
        }`}
      >
        {marketCondition}
        {marketCondition === "Fast Growth" && (
          <ArrowUpIcon className="w-5 h-5 text-green-500" />
        )}
        {marketCondition === "Slow Growth" && (
          <ArrowDownIcon className="w-5 h-5 text-red-500" />
        )}
      </p>
    </div>
  );
};

export default MarketIndicator;
