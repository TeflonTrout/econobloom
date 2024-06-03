export interface Player {
    id: string;  // Assuming 'id' is the wallet address
    walletAddress: `0x${string}`;
    createdAt: string;
    lastLogin: string;
    plants: Plant[];
  }

  export interface Plant {
    id?: string
    _creation_time: string | null
    growth_stage: number
    health: number
    last_market_check: string | null
    last_watered: string | null
    market_effect: string | null
    owner_id: string | null
    plant_id: string
    type: string
    wallet_address: string | null
    xp: number
    ready_to_evolve: boolean
  }