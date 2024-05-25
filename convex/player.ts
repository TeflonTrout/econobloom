import { v } from "convex/values";
import { query } from "./_generated/server";

export const getPlayerData = query({
  args: { walletAddress: v.string() },
  handler: async (ctx, args) => {
    const playerData = await ctx.db.query("players").filter((q) => q.eq(q.field("walletAddress"), args.walletAddress)).first();
    if (!playerData) {
        return null;  // or handle the case where the player doesn't exist
      }
    
      const plants = await Promise.all(
        playerData.plants.map(plantId => 
          ctx.db.get(plantId)
        )
      );
    
      return {
        player: playerData,
        plants: plants
      };
  },
});