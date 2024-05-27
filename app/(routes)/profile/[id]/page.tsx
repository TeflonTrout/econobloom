"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/app/utils/supabase/supabaseClient";
import { Plant } from "@/app/types/types";
import { useParams } from "next/navigation";
import PlantCard from "@/app/components/PlantCard";

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const fetchPlants = async () => {
      if (typeof id === "string") {
        const { data, error } = await supabase
          .from("plants")
          .select("*")
          .eq("wallet_address", id);

        if (error) {
          console.error("Error fetching plants:", error);
          return;
        }

        setPlants(data || []);
      }
    };

    fetchPlants();
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Profile Page</h1>
      <p>User wallet: {typeof id === "string" ? id : "Invalid ID"}</p>
      <div className="mt-4">
        <h2 className="text-lg font-bold">Plants Owned</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {plants.length > 0 ? (
            plants.map((plant) => <PlantCard key={plant.id} plant={plant} />)
          ) : (
            <p>No plants owned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
