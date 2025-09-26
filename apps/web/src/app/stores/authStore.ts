import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserResponse } from "@kanon-academy/types";

interface AuthState {
  user: UserResponse | null;
  token: string | null;
  setAuth: (user: UserResponse, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      clearAuth: () => {
        set({ user: null, token: null });
      }
    }),
    {
      name: "kanon-auth-storage"
    }
  )
);
