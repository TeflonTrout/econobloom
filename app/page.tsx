"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import MarketIndicator from "./components/MarketIndicator";

interface RSI {
  id: string;
  timestamp: Date;
  rsi_value: number;
}

export default function HomePage() {
  const { address } = useAccount();
  const [rsiData, setRsiData] = useState([]);

  useEffect(() => {
    const fetchRsiData = async () => {
      const { data } = await axios.get(
        "https://econobloom-server-production.up.railway.app/rsi/data"
      );
      console.log(data.data);
      const updatedData = data.data.map((item: RSI) => {
        const date = new Date(item.timestamp);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
        });
        return { ...item, timestamp: formattedDate };
      });
      console.log(updatedData);

      setRsiData(updatedData);
    };

    fetchRsiData();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center py-10 px-4">
        <div className="w-full flex flex-col justify-center items-center mx-auto">
          <div className="w-[80%] py-10 px-6  flex flex-col justify-center items-center bg-gray-700 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-white">
              Welcome to Econobloom!
            </h1>
            <p className="text-xl text-white mt-4">
              Start your virtual garden with our unique NFT plants!
            </p>
            <Link
              href="/mint"
              className="w-auto flex mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Mint Yours Here!
            </Link>
          </div>
        </div>
      </div>

      <div className="w-[50%] pb-10 px-4 flex justify-center">
        <MarketIndicator />
      </div>

      <div className="flex flex-col w-[80%] py-10 px-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl text-black font-bold mb-4">
          RSI Tracker (Ethereum)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={rsiData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" color="black" />
            <YAxis
              domain={[0, 100]}
              label={{ value: "RSI", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rsi_value"
              label="RSI"
              stroke="#03A9F4"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 8 }}
            />
            <ReferenceArea
              y1={60}
              label={{ value: "Fast", position: "insideRight" }}
              fill="#388E3C"
              fillOpacity={0.3}
            />
            <ReferenceArea
              y1={40}
              y2={60}
              label={{ value: "Normal", position: "insideRight" }}
              fill="#4CAF50"
              fillOpacity={0.1}
            />
            <ReferenceArea
              y1={0}
              y2={40}
              label={{ value: "Slow", position: "insideRight" }}
              fill="#388E3C"
              fillOpacity={0.3}
            />{" "}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
