"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import supabase from "../utils/supabase/supabaseClient";

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const checkAndCreatePlayer = async () => {
      if (address) {
        const { data: player, error } = await supabase
          .from("players")
          .select("*")
          .eq("wallet_address", address)
          .single();

        if (error && error.message !== "No rows found") {
          console.error("Error fetching player:", error);
          return;
        }

        if (player) {
          // Update last login timestamp
          await supabase
            .from("players")
            .update({ last_login: new Date().toISOString() })
            .match({ wallet_address: address });
        } else {
          // Player not found, create a new one
          const { error: createError } = await supabase.from("players").insert([
            {
              wallet_address: address,
              created_at: new Date().toISOString(),
              last_login: new Date().toISOString(), // Set last login at creation
              plants: [],
            },
          ]);

          if (createError) {
            console.error("Error creating player:", createError);
          }
        }
      }
    };

    if (isConnected) {
      checkAndCreatePlayer();
    }
  }, [address, isConnected]);

  return (
    <nav className="text-white p-4">
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
          <>
            <Link
              href={`/profile/${address}`}
              className="text-white no-underline hover:text-gray-200"
            >
              User Profile
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                disconnect();
              }}
              className="ml-4 bg-gray-700 p-2 rounded text-white hover:bg-gray-600"
            >
              Logout
            </button>
          </>
        ) : (
          <ConnectButton showBalance={false} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
