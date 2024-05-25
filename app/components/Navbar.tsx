"use client";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import useHandleUserConnection from "../hooks/useHandleUserConnection";

const Navbar = () => {
  useHandleUserConnection(); // This will handle user connection logic
  const { isConnected, address } = useAccount();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1>Econoblooom</h1>
        </Link>
        <div className="flex gap-4">
          <Link href="/about">About</Link>
          <Link href="/market">Market</Link>
          <Link href="/community">Community</Link>
        </div>
        {isConnected ? (
          <Link
            href={`/profile/${address}`}
            className="text-white no-underline hover:text-gray-200"
          >
            User Profile
          </Link>
        ) : (
          <ConnectButton showBalance={false} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
