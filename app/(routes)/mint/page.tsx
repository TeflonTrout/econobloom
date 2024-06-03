"use client";
import { MintButton } from "@/app/components/MintButton";
import { useAccount } from "wagmi";

export default function MintPage() {
  const { address } = useAccount();

  return (
    <div className="min-h-vh my-4 flex flex-col items-center align-middle justify-between p-10">
      <div className="grid grid-cols-3 gap-4 w-full justify-center items-center max-w-4xl">
        {/* Cactus */}
        <div className="text-center p-6 bg-white shadow-xl rounded-lg">
          <img
            src="/images/Cactus.png"
            alt="Cactus"
            className="h-32 w-auto mx-auto mb-4"
          />
          <h2 className="text-xl font-bold">Mint Cactus</h2>
          <p className="text-gray-600 mb-4">
            Start with a resilient and unique Cactus NFT.
          </p>
          <MintButton userAddress={address} plantType="Cactus" />
        </div>
        {/* Succulent */}
        <div className="text-center p-6 bg-white shadow-xl rounded-lg">
          <img
            src="/images/Vine.png"
            alt="Succulent"
            className="h-32 w-auto mx-auto mb-4"
          />
          <h2 className="text-xl font-bold">Mint Succulent</h2>
          <p className="text-gray-600 mb-4">
            Grow a hardy and beautiful Succulent NFT.
          </p>
          <MintButton userAddress={address} plantType="Succulent" />
        </div>
        {/* Mushrooms */}
        <div className="text-center p-6 bg-white shadow-xl rounded-lg">
          <img
            src="/images/Mushroom.png"
            alt="Mushrooms"
            className="h-32 w-auto mx-auto mb-4"
          />
          <h2 className="text-xl font-bold">Mint Mushrooms</h2>
          <p className="text-gray-600 mb-4">
            Discover the mystical world of Mushroom NFTs.
          </p>
          <MintButton userAddress={address} plantType="Mushroom" />
        </div>
      </div>
    </div>
  );
}
