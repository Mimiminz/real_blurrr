import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { LeagueList } from "@/types/league";

interface LeagueState {
  brandLeagueList: LeagueList[];
  userLeagueList: LeagueList[];
  mentionTabs: LeagueList[];
  initialized: boolean;
  isLoadUserLeagues: boolean;
  activeTabName: string;
  setBrandLeagueTab: (brandLeagues: LeagueList[]) => void;
  setUserLeagueList: (userLeagues: LeagueList[]) => void;
  setMentionTabs: (mentionTabs: LeagueList[]) => void;
  setInitialized: (value: boolean) => void;
  setIsLoadUserLeagues: (value: boolean) => void;
  setActiveTabName: (name: string) => void;
}

export const useLeagueStore = create<LeagueState>()(
  devtools((set) => ({
    brandLeagueList: [],
    userLeagueList: [],
    mentionTabs: [],
    initialized: false,
    isLoadUserLeagues: false,
    activeTabName: "",
    setBrandLeagueTab: (brandLeagues) => set({ brandLeagueList: brandLeagues }),
    setUserLeagueList: (userLeagues) => set({ userLeagueList: userLeagues }),
    setMentionTabs: (mentionTabs) => set({ mentionTabs: mentionTabs }),
    setInitialized: (value) => set({ initialized: value }),
    setIsLoadUserLeagues: (value) => set({ isLoadUserLeagues: value }),
    setActiveTabName: (name) => set({ activeTabName: name }),
  }))
);
