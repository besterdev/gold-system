import create from 'zustand'

interface DialogState {
  isOpen: boolean
  image: string
  content: string
  toggleDialog: () => void
  onConfirm: () => void
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  image: '',
  content: '',
  toggleDialog: () => set((state) => ({ isOpen: !state.isOpen })),
  onConfirm: () => null
}))
