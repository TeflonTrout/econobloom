"use client";
import { useAccount } from "wagmi";
import { MintButton } from "./components/MintButton";

export default function HomePage() {
  const { address } = useAccount();

  return (
    <div>
      <h1>Welcome to Econobloom!</h1>
      <div>Mint your plant!</div>
      <MintButton userAddress={address!} plantType="Cactus" />
      <MintButton userAddress={address!} plantType="Vine" />
    </div>
  );
}
