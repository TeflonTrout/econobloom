import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function useHandleUserConnection() {
  const { isConnected, address } = useAccount();
  const createPlayer = useMutation(api.createPlayer.createPlayer);

  useEffect(() => {
    if (isConnected && address) {
      const addressString:string = address.toString()
      createPlayer({ walletAddress: addressString, username: "null"});
    }
  }, [isConnected, address, createPlayer]);
}
