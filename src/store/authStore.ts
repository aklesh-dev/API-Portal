import { create } from "zustand";

export interface User {
  username: string;
  role: string;
  exp: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: sessionStorage.getItem("token"),
  user: null,
  setToken: (token) => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
    set({ token });
  },
  setUser: (user) => set({ user }),
  logout: () => {
    sessionStorage.removeItem("token");
    set({ token: null, user: null });
  },
})); 
