import { create } from 'zustand';

import { UserProfile } from '@/api/types';

interface AuthState {
  phone: string;
  dialCode: string;
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  setPhone: (phone: string, dialCode?: string) => void;
  setAuth: (token: string, user: UserProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  phone: '',
  dialCode: '+91',
  token: null,
  user: null,
  isAuthenticated: false,
  setPhone: (phone: string, dialCode = '+91') => set({ phone, dialCode }),
  setAuth: (token: string, user: UserProfile) =>
    set({ token, user, isAuthenticated: Boolean(token) }),
  logout: () =>
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      phone: '',
    }),
}));
