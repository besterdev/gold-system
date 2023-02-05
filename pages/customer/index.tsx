import React from 'react'
import CustomerListTable from '@features/customer/components/CustomerListTable'
import AuthMiddleware from 'core/middleware/AuthMiddleware'
import _ from 'lodash'

import { Button, SearchInput } from '@core/components'

import { useCustomerListStore } from '@features/customer/store'
import { useRouter } from 'next/router'

type Person = {
  id: string
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

const generateRandomIdCard = () => {
  const numberList = _.map(_.range(13), () => _.random(0, 9))
  return _.join(numberList, '')
}

const defaultData: Person[] = [
  {
    id: '1',
    firstName: 'วิรขัย',
    lastName: 'พรมันลา',
    idCard: generateRandomIdCard(),
    image: 'https://api.lorem.space/image/fashion?w=150&h=150&r=1',
    age: _.random(25, 70),
    visits: 2,
    status: 'Active',
    progress: 50,
    balance: 30000
  },
  {
    id: '2',
    firstName: 'สุพิศ',
    lastName: 'วิเศษชาติ',
    idCard: generateRandomIdCard(),
    image: 'https://api.lorem.space/image/fashion?w=150&h=150&r=2',
    age: _.random(25, 70),
    visits: 3,
    status: 'Active',
    progress: 80,
    balance: 530000
  },
  {
    id: '3',
    firstName: 'นฤเดช',
    lastName: 'บัวพร',
    idCard: generateRandomIdCard(),
    image: 'https://api.lorem.space/image/fashion?w=150&h=150&r=3',
    age: _.random(25, 70),
    visits: 1,
    status: 'Banned',
    progress: 10,
    balance: 80000
  },
  {
    id: '4',
    firstName: 'อำพร',
    lastName: 'แก้วจันทร์',
    idCard: generateRandomIdCard(),
    image: 'https://api.lorem.space/image/fashion?w=150&h=150&r=4',
    age: _.random(25, 70),
    visits: 2,
    status: 'Banned',
    progress: 10,
    balance: 80000
  },
  {
    id: '5',
    firstName: 'ลำดวน',
    lastName: 'โพธิ์แก้ว',
    idCard: generateRandomIdCard(),
    image: 'https://api.lorem.space/image/fashion?w=150&h=150&r=5',
    age: _.random(25, 70),
    visits: 1,
    status: 'Banned',
    progress: 10,
    balance: 80000
  },
  {
    id: '6',
    firstName: 'ธรีพล',
    lastName: 'ศรชัย',
    idCard: generateRandomIdCard(),
    image: 'https://api.lorem.space/image/fashion?w=150&h=150&r=6',
    age: _.random(25, 70),
    visits: 3,
    status: 'Active',
    progress: 10,
    balance: 80000
  },
  {
    id: '7',
    firstName: 'วิรรณภา',
    lastName: 'สิงห์ศร',
    idCard: generateRandomIdCard(),
    image: 'https://api.lorem.space/image/fashion?w=150&h=150&r=7',
    age: _.random(25, 70),
    visits: 1,
    status: 'Active',
    progress: 10,
    balance: 80000
  },
  {
    id: '8',
    firstName: 'สิทธิ์ศักดิ์',
    lastName: 'วิเศษชาติ',
    idCard: generateRandomIdCard(),
    image: 'https://api.lorem.space/image/fashion?w=150&h=150&r=8',
    age: _.random(25, 70),
    visits: 2,
    status: 'Active',
    progress: 10,
    balance: 80000
  },
  {
    id: '9',
    firstName: 'สุวรรณา',
    lastName: 'วงศ์ภักดี',
    idCard: generateRandomIdCard(),
    image: 'https://api.lorem.space/image/fashion?w=150&h=150&r=9',
    age: _.random(25, 70),
    visits: 1,
    status: 'Active',
    progress: 10,
    balance: 80000
  },
  {
    id: '10',
    firstName: 'ธีดา',
    lastName: 'หาวัน',
    idCard: generateRandomIdCard(),
    image: 'https://api.lorem.space/image/fashion?w=150&h=150&r=10',
    age: _.random(25, 70),
    visits: 3,
    status: 'Active',
    progress: 10,
    balance: 80000
  }
]

const Customer = () => {
  const router = useRouter()
  // const [search, setSearch] = useState('')
  // const [data, setData] = React.useState(() => [...defaultData])
  // const debouncedValue = useDebounce<string>(search, 500)

  // const search = useCustomerListStore((state: any) => state.search)

  const { person, search, setSearch } = useCustomerListStore()

  return (
    <AuthMiddleware>
      <div className="container grid w-screen h-screen mx-auto bg-white-200">
        <main className="flex flex-col justify-center w-full px-40 py-10">
          <div className="flex justify-between mb-10">
            <p className="heading3 text-grey-800">รายการลูกค้า</p>
            <Button onClick={() => router.push('/customer/new')} size="large">
              <i className="mr-2 fa-solid fa-plus" />
              New Customer
            </Button>
          </div>
          <div className="overflow-hidden bg-white rounded-2xl shadow-card">
            <div className="w-full p-6 ">
              <SearchInput placeholder="ค้าหาชื่อลูกค้า หรือ เลขบัตรประชาชน" value={search} onChange={(value) => setSearch(value)} />
            </div>
            <CustomerListTable data={defaultData} />
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <p className="body2 text-grey-600">Result 1-10 of 54</p>
              <div className="flex space-x-4">
                <div className="flex items-center justify-center w-4 h-4 p-2 rounded-full cursor-pointer text-grey-800 hover:bg-grey-200">
                  <i className="text-xs fa-solid fa-chevron-left" />
                </div>
                <div className="flex items-center justify-center w-4 h-4 p-2 rounded-full cursor-pointer text-grey-800 hover:bg-grey-200">
                  <i className="text-xs fa-solid fa-chevron-right" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthMiddleware>
  )
}

export default Customer
