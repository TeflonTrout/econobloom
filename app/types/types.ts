export interface Player {
    id: string;  // Assuming 'id' is the wallet address
    walletAddress: `0x${string}`;
    createdAt: string;
    lastLogin: string;
    plants: Plant[];
  }

  export interface Plant {
    _creation_time: string | null
    growth_stage: number | null
    health: number | null
    id: string
    last_market_check: string | null
    last_watered: string | null
    market_effect: string | null
    owner_id: string | null
    plant_id: string | null
    type: string | null
    wallet_address: string | null
  }