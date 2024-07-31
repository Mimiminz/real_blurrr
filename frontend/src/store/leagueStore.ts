import { create } from "zustand";
import { LeagueList } from "@/types/league";

interface LeagueState {
  brandLeagueList: LeagueList[];
  initialized: boolean;
  setBrandLeagueTab: (brandLeagues: LeagueList[]) => void;
  setInitialized: (value: boolean) => void;
}

export const useLeagueStore = create<LeagueState>((set) => ({
  brandLeagueList: [],
  initialized: false,
  setBrandLeagueTab: (brandLeagues) => set({ brandLeagueList: brandLeagues }),
  setInitialized: (value) => set({ initialized: value }),
}));
