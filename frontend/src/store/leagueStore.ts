import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { LeagueList } from "@/types/leagueTypes";

interface LeagueState {
  brandLeagueList: LeagueList[];
  userLeagueList: LeagueList[];
  mentionTabs: LeagueList[];
  initialized: boolean;
  isLoadUserLeagues: boolean;
  activeTab: LeagueList;
  setBrandLeagueTab: (brandLeagues: LeagueList[]) => void;
  setUserLeagueList: (userLeagues: LeagueList[]) => void;
  setMentionTabs: (mentionTabs: LeagueList[]) => void;
  setInitialized: (value: boolean) => void;
  setIsLoadUserLeagues: (value: boolean) => void;
  setActiveTab: (league: LeagueList) => void;
}

export const useLeagueStore = create<LeagueState>()(
  devtools(
    persist(
      (set) => ({
        brandLeagueList: [],
        userLeagueList: [],
        mentionTabs: [],
        initialized: false,
        isLoadUserLeagues: false,
        activeTab: {
          id: "",
          name: "",
          type: "",
          peopleCount: 0,
        },
        setBrandLeagueTab: (brandLeagues) =>
          set({ brandLeagueList: brandLeagues }),
        setUserLeagueList: (userLeagues) =>
          set({ userLeagueList: userLeagues }),
        setMentionTabs: (mentionTabs) => set({ mentionTabs: mentionTabs }),
        setInitialized: (value) => set({ initialized: value }),
        setIsLoadUserLeagues: (value) => set({ isLoadUserLeagues: value }),
        setActiveTab: (league) => set({ activeTab: league }),
      }),
      {
        name: "league-storage",
        partialize: (state) => ({ userLeagueList: state.userLeagueList }), // userLeagueList만 저장
        getStorage: () => sessionStorage, // sessionStorage를 사용
      }
    )
  )
);
