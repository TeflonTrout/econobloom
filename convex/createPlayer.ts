import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createPlayer = mutation({
  args: { walletAddress: v.string(), username: v.string() },
  handler: async (ctx, args) => {
    const existingPlayer = await ctx.db.query("players").filter((q:any) => q.eq(q.field("walletAddress"), args.walletAddress)).first();
    if(!existingPlayer) {
      await ctx.db.insert('players', {
        walletAddress: args.walletAddress,
        username: args.username,
        createdAt: String(new Date().toISOString()),
        lastLogin: String(new Date().toISOString()),
        plants: []
      })
      console.log('New Player Created: ', args.walletAddress)
    } else {
      console.log('Player Exists: ', args.walletAddress)
    }
  },
});