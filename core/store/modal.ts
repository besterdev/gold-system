import create from 'zustand'

interface ModalState {
  isOpen: boolean
  toggleDialog: () => void
  onConfirm: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  toggleDialog: () => set((state) => ({ isOpen: !state.isOpen })),
  onConfirm: () => null
}))
