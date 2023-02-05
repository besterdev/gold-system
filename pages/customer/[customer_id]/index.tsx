import Image from 'next/image'

import { Button, SearchInput, Tabs } from '@core/components'
import ContractListTable from '@features/customer/components/ContractListTable'
import { DatePicker } from '@core/components/Forms/DatePicker'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'

const defaultData = [
  {
    contractId: '0001',
    item: { name: 'สร้อย', cover: 'https://api.lorem.space/image/fashion?w=150&h=150&r=1' },
    status: 'active',
    balancePayment: 35000,
    interest: 700,
    openDate: '12 มกราคม 25652'
  },
  {
    contractId: '0002',
    item: { name: 'แหวน', cover: 'https://api.lorem.space/image/fashion?w=150&h=150&r=1' },
    status: 'close',
    balancePayment: 55000,
    interest: 550,
    openDate: '1 มกราคม 25652'
  }
]

const tabs = [
  {
    label: 'All',
    onClick: () => console.log(1)
  },
  {
    label: 'Active',
    onClick: () => console.log(2)
  },
  {
    label: 'Close',
    onClick: () => console.log(3)
  }
]

const CustomerProfile = () => {
  const router = useRouter()
  const { customer_id } = router.query

  const [date, setDate] = useState('')
  return (
    <div className="container h-screen mx-auto bg-white-200">
      <div className="flex items-center justify-between mt-24">
        <div>
          <h1 className="heading3">ข้อมูลลูกค้า</h1>
        </div>
        <Button
          color="primary"
          className="flex items-center h-12 mt-6"
          onClick={() => Router.push(`/customer/${customer_id}/contract/new`)}
          size="large">
          <i className="mr-2 text-xl fa-solid fa-plus" />
          สร้างสัญญา
        </Button>
      </div>
      <div className="flex items-start mt-10 space-x-8">
        <div className="flex flex-col items-center justify-center w-1/4 px-6 py-10 bg-white rounded-2xl shadow-card">
          <Image className="rounded-full" alt="Mountains" width={160} height={160} src="https://api.lorem.space/image/fashion?w=150&h=150&r=1" />
          <p className="mt-4 button1">สุพิศ วิเศษชาติ</p>
          <div className="w-full mt-4">
            <div className="flex space-x-4">
              <i className="w-5 fa-solid fa-id-card text-grey-900" />
              <p className="body2 text-grey-800">6601674808682</p>
            </div>
            <div className="flex mt-4 space-x-4">
              <i className="w-5 fa-solid fa-phone text-grey-900" />
              <p className="body2 text-grey-700">0909796320</p>
            </div>
            <div className="flex mt-4 space-x-4">
              <i className="w-5 fa-solid fa-location-dot text-grey-900" />
              <p className="body2 text-grey-700">หมู่บ้าน ดีเค ซอยพระยามนต์ธาตุฯ แยก 35-16-1 10150</p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-2xl shadow-card">
          <div className="px-6 py-2 button1 rounded-t-2xl bg-grey-200">
            <Tabs tabs={tabs} />
          </div>
          <div className="p-6">
            <DatePicker id="start" value={date} onChange={(date) => setDate(date)} />
          </div>
          <ContractListTable data={defaultData} />
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
      </div>
    </div>
  )
}

export default CustomerProfile
