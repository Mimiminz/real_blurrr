import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChannelState {
  channelName: string | null;
  channelId: string | null;
  setChannelName: (name: string | null) => void;
  setChannelId: (id: string | null) => void;
}

export const useChannelStore = create<ChannelState>()(
  persist(
    (set) => ({
      channelName: null,
      channelId: null,
      setChannelName: (name) => set({ channelName: name }),
      setChannelId: (id) => set({ channelId: id }),
    }),
    {
      name: 'channel-storage', 
      getStorage: () => sessionStorage, 
    }
  )
);
