import create from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  setUser: (data: any) => set({ user: data })
}))
