import create from 'zustand'

type Person = {
  firstName: string
  lastName: string
  idCard: string
  image: string
  age: number
  visits: number
  status: string
  progress: number
  balance: number
}

interface DialogState {
  search: string
  setSearch: Function
  person: Person[]
}

export const useCustomerListStore = create<DialogState>((set) => ({
  search: '',
  person: [
    {
      firstName: 'วิรขัย',
      lastName: 'พรมันลา',
      idCard: '1234134134',
      image: 'https://api.lorem.space/image/fashion?w=150&h=150&r=1',
      age: 30,
      visits: 2,
      status: 'Active',
      progress: 50,
      balance: 30000
    },
    {
      firstName: 'สุพิศ',
      lastName: 'วิเศษชาติ',
      idCard: '123123123',
      image: 'https://api.lorem.space/image/fashion?w=150&h=150&r=2',
      age: 24,
      visits: 3,
      status: 'Active',
      progress: 80,
      balance: 530000
    }
  ],
  setSearch: (value: string) => set(() => ({ search: value }))
}))
