import { create } from 'zustand'

type AuthState = {
  phone: string
  dialCode: string
  setPhone: (phone: string, dialCode?: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  phone: '',
  dialCode: '+91',
  setPhone: (phone, dialCode = '+91') => set({ phone, dialCode }),
}))
