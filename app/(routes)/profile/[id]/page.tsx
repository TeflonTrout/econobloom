"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

const ProfilePage = () => {
  const params = useParams();
  const data = useQuery(api.player.getPlayerData, {
    walletAddress: params.id.toString(),
  });
  console.log(data?.plants);
  return (
    <div>
      <h1>Profile Page</h1>
      <p>User wallet: {params.id}</p>
      <div>
        <h1>Plants Owned</h1>
        <div>
          {data?.plants?.map((plant: any) => (
            <div key={plant._id}>
              <h1>{plant.type}</h1>
              <p>{plant.health}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
