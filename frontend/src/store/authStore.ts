import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  email: string;
  profileUrl: string;
  nickname: string;
  carTitle: string;
  isAuth: boolean;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  clearAuthState: () => void;
  setIsLoggedIn: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(devtools(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isLoggedIn: false,
      setAccessToken: (token) => {
        set({ accessToken: token, isLoggedIn: token !== null });
      },
      setRefreshToken: (token) => set({ refreshToken: token }),
      setUser: (user) => set({ user }),
      clearAuthState: () => set({ accessToken: null, refreshToken: null, user: null, isLoggedIn: false }),
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
    })),
    {
      name: 'auth-storage',
      getStorage: () => sessionStorage,
    }
  )
);
