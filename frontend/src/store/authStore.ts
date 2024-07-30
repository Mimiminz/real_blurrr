import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  clearAccessToken: () => void;
  setIsLoggedIn: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isLoggedIn: false,
      setAccessToken: (token) => set({ accessToken: token, isLoggedIn: !!token }),
      clearAccessToken: () => set({ accessToken: null, isLoggedIn: false }),
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
    }),
    {
      name: 'auth-storage', // 로컬 스토리지에 저장될 키
      getStorage: () => sessionStorage, // 사용할 스토리지 (localStorage 또는 sessionStorage)
    }
  )
);
