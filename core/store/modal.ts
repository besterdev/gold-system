import create from 'zustand'

export const useModalStore = create((set) => ({
  isOpen: false,
  //   type: 'confirm' | 'dialog',
  setUser: (data: any) => set({ user: data })
}))
