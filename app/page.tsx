"use client";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      {/* {players?.map((player: any) => (
        <h1 key={player._id}>{player.username}</h1>
      ))} */}
    </div>
  );
}
