"use client";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Plant } from "@/app/types/types";
import PlantCard from "@/app/components/PlantCard";

const Market = () => {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const { data } = await axios.get(
        "https://econobloom-server.onrender.com/plants/all"
      );
      if (data) {
        setPlants(data);
      } else {
        console.error("Error fetching plants:");
      }
    };

    fetchPlants();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-pink-200 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Plant Marketplace
        </h1>
        <ul className="grid grid-cols-3 gap-4">
          {/* Map through plants data fetched from your database */}
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              marketplace={true}
              updatePlant={() => {}}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Market;
