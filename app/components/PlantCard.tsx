"use client";
import React from "react";
import { Plant } from "@/app/types/types";

interface PlantCardProps {
  plant: Plant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  return (
    <div className="p-4 shadow-lg rounded-lg bg-white hover:bg-gray-100 transition-colors">
      <h3 className="text-lg font-bold text-black">{plant.type}</h3>
      <p className="text-gray-600">Health: {plant.health}</p>
      <p className="text-gray-600">Stage: {plant.growth_stage}</p>
    </div>
  );
};

export default PlantCard;
