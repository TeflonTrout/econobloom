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
        .eq("wallet_address", id)
        .order("_creation_time", { ascending: false });

      if (error) {
        console.error("Error fetching plants:", error);
        return;
      }

      setPlants(data || []);
      setIsLoading(false);
    }
  };

  const updatePlant = (updatedPlant: Plant) => {
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
    <div className="min-h-[100vh] p-4 flex flex-col justify-start items-center w-full">
      <h1 className="text-3xl font-bold">
        {typeof id === "string"
          ? `${id.slice(0, 4)}...${id.slice(38, 42)}`
          : "Invalid ID"}
        &apos;s Garden
      </h1>
      <div className="mt-4 flex flex-col justify-start items-center">
        <h2 className="mb-4 text-3xl font-bold">
          Plants Owned: {!isLoading ? plants.length : null}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {plants.length > 0 && !isLoading
            ? plants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  updatePlant={() => updatePlant(plant)}
                  marketplace={false}
                />
              ))
            : null}
        </div>
        {isLoading ? (
          <p className="w-full text-2xl font-bold text-center items-center flex justify-center">
            Loading...
          </p>
        ) : (
          <p>No plants owned.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
