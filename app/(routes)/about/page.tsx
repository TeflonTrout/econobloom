import React from "react";
import {
  BeakerIcon,
  SunIcon,
  CircleStackIcon,
} from "@heroicons/react/16/solid";

const AboutPage = () => {
  return (
    <div className="min-h-screen p-10">
      <div className="max-w-4xl mx-auto bg-gray-700 rounded-lg shadow-md p-8 mb-10">
        <h1 className="text-3xl font-bold text-center mb-4">
          About Econobloom
        </h1>
        <p className="text-lg text-white">
          Econobloom is a platform where users can mint, grow, and evolve their
          own plant NFTs, influenced by real-world economic indicators.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <BeakerIcon className="h-10 w-10 text-green-300 mb-4" />
          <h2 className="text-xl font-bold mb-2">Mint Your Plant</h2>
          <p className="text-white">
            Start your journey by minting a unique plant NFT on the blockchain.
            Each plant starts at its basic form and has potential to grow.
          </p>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <SunIcon className="h-10 w-10 text-yellow-300 mb-4" />
          <h2 className="text-xl font-bold mb-2">Grow and Nurture</h2>
          <p className="text-white">
            Water and care for your plant daily. Your actions directly influence
            its growth and health, simulating a real gardening experience.
          </p>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <CircleStackIcon className="h-10 w-10 text-blue-300 mb-4" />
          <h2 className="text-xl font-bold mb-2">Evolve and Collect</h2>
          <p className="text-white">
            As your plant grows, it can evolve into rarer forms. Collect various
            types of plants and discover all the unique traits they offer.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-gray-700 rounded-lg shadow-md p-8 mt-10">
        <h1 className="text-2xl font-bold text-center mb-4">
          Join Our Community
        </h1>
        <p className="text-lg text-white text-center">
          Be part of a community of gardeners and blockchain enthusiasts. Share
          tips, strategies, and showcase your unique plant collection.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
