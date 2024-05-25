import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  plants: defineTable({
    growthStage: v.float64(),
    health: v.float64(),
    lastMarketCheck: v.string(),
    lastWatered: v.string(),
    marketEffect: v.string(),
    ownerId: v.string(),
    plantId: v.string(),
    type: v.string(),
  }),
  players: defineTable({
    walletAddress: v.string(),
    username: v.string(),
    createdAt: v.string(),
    lastLogin: v.string(),
    plants: v.array(v.id("plants"))
  }),
});