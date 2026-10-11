import { create } from 'zustand';

export type ThemePreference = 'system' | 'light' | 'dark';

interface ThemeState {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  preference: 'system',
  setPreference: (preference) => set({ preference }),
  toggleTheme: () =>
    set((state) => ({
      preference: state.preference === 'dark' ? 'light' : 'dark',
    })),
}));
