"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/app/utils/supabase/supabaseClient";
import { useParams } from "next/navigation";
import PlantCard from "@/app/components/PlantCard";
import { Plant } from "@/app/types/types";

const ProfilePage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plants, setPlants] = useState<Plant[]>([]);

  const fetchPlants = async () => {
    if (typeof id === "string") {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("plants")
        .select("*")
        .eq("wallet_address", id);

      if (error) {
        console.error("Error fetching plants:", error);
        return;
      }

      setPlants(data || []);
      setIsLoading(false);
    }
  };

  const updatePlant = (updatedPlant: Plant) => {
    console.log("running", updatedPlant.id);
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  };

  useEffect(() => {
    fetchPlants();
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Profile Page</h1>
      <p>User wallet: {typeof id === "string" ? id : "Invalid ID"}</p>
      <div className="mt-4">
        <h2 className="text-lg font-bold">Plants Owned</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {plants.length > 0 && !isLoading ? (
            plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                updatePlant={() => updatePlant(plant)}
              />
            ))
          ) : isLoading ? (
            <p>Loading...</p>
          ) : (
            <p>No plants owned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
