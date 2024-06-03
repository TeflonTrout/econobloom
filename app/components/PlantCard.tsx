// PlantCard.tsx
"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSnackbar } from "../context/SnackbarContext";
import { Plant } from "../types/types";
import EvolveButton from "./EvolvePlantButton";
import { useAccount } from "wagmi";

interface PlantCardProps {
  plant: Plant;
  marketplace: boolean;
  updatePlant: (updatedPlant: Plant) => void; // Function to update the plant in the parent state
}

const PlantCard: React.FC<PlantCardProps> = ({
  plant,
  updatePlant,
  marketplace,
}) => {
  const { address } = useAccount();
  const { showMessage } = useSnackbar();
  const [plantData, setPlantData] = useState<Plant>(plant);
  const [canWater, setCanWater] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>(
    `/images/${plant.growth_stage >= 1 ? plant.type : "Seedling"}.png`
  );

  useEffect(() => {
    const checkWateringStatus = () => {
      const now = new Date();
      const lastWatered = new Date(plantData?.last_watered || 0);
      const hoursSinceLastWatered =
        (now.getTime() - lastWatered.getTime()) / 1000 / 3600;

      // Allow watering if it has been more than 8 hours and less than 3 waterings today
      setCanWater(hoursSinceLastWatered >= 8);
    };

    checkWateringStatus();
  }, [plantData]);

  const waterPlant = async () => {
    try {
      showMessage("Watering Plant...", true);
      const { data } = await axios.post(
        `https://econobloom-server.onrender.com/water/${plant.id}`
      );

      const updatedPlant = data[0];
      setPlantData(updatedPlant);
      updatePlant(updatedPlant); // Update the state of this plant only
      if (updatedPlant.xp == 0) {
        showMessage("Evolution Ready!");
      } else {
        showMessage("Plant watered successfully!");
      }
    } catch (error) {
      console.error("Error watering plant:", error);
      showMessage("Failed to water plant. You can only water twice a day.");
    }
  };

  const growPlant = async () => {
    try {
      const { data } = await axios.post(
        `https://econobloom-server.onrender.com/grow/${plant.id}`
      );

      console.log(data);
      const updatedPlant = data[0];
      setPlantData(updatedPlant);
      setImagePath(
        `/images/${
          updatedPlant?.growth_stage >= 1 ? updatedPlant?.type : "Seedling"
        }.png`
      );
      updatePlant(updatedPlant); // Update the state of this plant only

      if (updatedPlant) {
        showMessage("Plant Evolved Successfully!");
      }
    } catch (error) {
      console.error("Error during the Supabase update:", error);
      showMessage("Error updating plant after evolution.");
    }
  };

  return (
    <div className="p-4 shadow-lg rounded-lg bg-white">
      <img
        src={imagePath}
        alt={`${plant?.type} Stage ${plant?.growth_stage}`}
        className="w-full h-auto"
      />
      <div className="flex w-full justify-between">
        <h3 className="text-lg font-bold text-black">{plant.type}</h3>
        <h3 className="text-lg font-bold text-black">#{plant.plant_id}</h3>
      </div>
      <p className="text text-black font-bold">
        Stage: {plantData?.growth_stage}
      </p>
      <p className="text-gray-600">
        Owner: {`${plantData?.wallet_address?.slice(0, 5)}...`}
      </p>

      <div className="mt-2">
        <p className="text-black">Health:</p>
        <div className="w-full bg-gray-300 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{
              width: `${Math.min(Math.max(plantData?.health, 0), 100)}%`,
              transition: "width 0.5s ease-in-out",
            }}
          ></div>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex justify-between w-full">
          <p className="text-black ">XP: </p>
          <p className="text-black">{plantData?.xp}/100</p>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{
              width: `${Math.min(Math.max(plantData?.xp, 0), 100)}%`,
              transition: "width 0.5s ease-in-out",
            }}
          ></div>
        </div>
      </div>

      {/* Button container */}
      {/* ONLY DISPLAY IF OWNER */}
      {address == plantData?.wallet_address && !marketplace ? (
        <div className="flex justify-between mt-4 space-x-4">
          <button
            onClick={() => waterPlant()}
            className={`w-1/2 font-bold py-1 px-2 rounded ${
              canWater
                ? plantData?.xp >= 95
                  ? "bg-yellow-500 hover:bg-yellow-700 text-white"
                  : "bg-blue-500 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!canWater}
          >
            Water Plant
          </button>

          <EvolveButton
            readyToEvolve={plantData?.ready_to_evolve}
            tokenId={plantData?.plant_id}
            growPlant={() => growPlant()}
            updatePlant={() => updatePlant(plant)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PlantCard;
