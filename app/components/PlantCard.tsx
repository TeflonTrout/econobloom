// PlantCard.tsx
"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSnackbar } from "../context/SnackbarContext";
import { Plant } from "../types/types";
import EvolveButton from "./EvolvePlantButton";

interface PlantCardProps {
  plant: Plant;
  updatePlant: (updatedPlant: Plant) => void; // Function to update the plant in the parent state
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, updatePlant }) => {
  const { showMessage } = useSnackbar();
  const [plantData, setPlantData] = useState<Plant>(plant);
  const [canWater, setCanWater] = useState<boolean>(false);

  useEffect(() => {
    const checkWateringStatus = () => {
      const now = new Date();
      const lastWatered = new Date(plantData.last_watered || 0);
      const hoursSinceLastWatered =
        (now.getTime() - lastWatered.getTime()) / 1000 / 3600;

      // Allow watering if it has been more than 8 hours and less than 3 waterings today
      setCanWater(hoursSinceLastWatered >= 8);
    };

    checkWateringStatus();
  }, [plantData]);

  const waterPlant = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/water/${plant.id}`
      );
      setPlantData(data[0]);
      updatePlant(data[0]); // Update the state of this plant only
      showMessage("Plant watered successfully!");
    } catch (error) {
      console.error("Error watering plant:", error);
      showMessage("Failed to water plant. You can only water twice a day.");
    }
  };

  const growPlant = async () => {
    try {
      const { data: updatedPlant } = await axios.post(
        `http://localhost:5000/grow/${plant.id}`,
        { growth_stage: plant.growth_stage + 1, ready_to_evolve: false }
      );
      setPlantData(updatedPlant[0]);
      updatePlant(updatedPlant[0]); // Update the state of this plant only

      if (updatedPlant) {
        showMessage("Plant Evolved Successfully!");
      }
    } catch (error) {
      showMessage("Failed to update plant data.");
      console.error("Error during the Supabase update:", error);
      showMessage("Error updating plant after evolution.");
    }
  };

  return (
    <div className="p-4 shadow-lg rounded-lg bg-white">
      <div className="flex w-full justify-between">
        <h3 className="text-lg font-bold text-black">{plantData.type}</h3>
        <h3 className="text-lg font-bold text-black">{plantData.plant_id}</h3>
      </div>
      <p className="text-gray-600">Stage: {plantData.growth_stage}</p>

      <div className="mt-2">
        <p className="text-black">Health:</p>
        <div className="w-full bg-gray-300 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{
              width: `${Math.min(Math.max(plantData.health, 0), 100)}%`,
              transition: "width 0.5s ease-in-out",
            }}
          ></div>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-black">XP: {plantData.xp}</p>
        <div className="w-full bg-gray-300 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{
              width: `${Math.min(Math.max(plantData.xp, 0), 100)}%`,
              transition: "width 0.5s ease-in-out",
            }}
          ></div>
        </div>
      </div>

      {/* Button container */}
      <div className="flex justify-between mt-4 space-x-4">
        <button
          onClick={() => waterPlant()}
          className={`w-1/2  text-white font-bold py-1 px-2 rounded ${
            canWater
              ? "bg-blue-500 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!canWater}
        >
          Water Plant
        </button>

        <EvolveButton
          plant={plant}
          tokenId={plant.plant_id}
          growPlant={() => growPlant()}
        />
      </div>
    </div>
  );
};

export default PlantCard;
