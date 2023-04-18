import { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import { getCustomer, getContracts } from 'core/service'

import { Button, SearchInput, Tabs } from '@core/components'
import { DatePicker } from '@core/components/Forms/DatePicker'
import ContractListTable from '@features/customer/components/ContractListTable'

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

type InitialQuery = {
  page: number
  limit: number
  status: boolean | undefined
}

const initialQuery: InitialQuery = {
  page: 1,
  limit: 10,
  status: undefined
}

const CustomerProfile = () => {
  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter()
  const customerId = router.query.id as string

  //---------------------
  // STATE
  //---------------------
  const [query, setQuery] = useState(initialQuery)

  //---------------------
  // QUERY DATA
  //---------------------
  const {
    data: customer,
    isLoading,
    isFetched,
    error
  } = useQuery({
    queryKey: ['customer', customerId],
    // keepPreviousData: true,
    queryFn: async () => getCustomer(customerId)
  })

  const {
    data: contractList,
    isLoading: isLoadingContract,
    isFetched: isFetchedContract,
    error: errorContract
  } = useQuery({
    queryKey: ['contract', customerId, query],
    keepPreviousData: true,
    queryFn: async () => getContracts({ customerId: customerId, ...query })
  })

  const tabs = [
    {
      label: 'All',
      onClick: () => setQuery({ ...query, status: undefined })
    },
    {
      label: 'Active',
      onClick: () => setQuery({ ...query, status: true })
    },
    {
      label: 'Close',
      onClick: () => setQuery({ ...query, status: false })
    }
  ]

  //---------------------
  // RENDER
  //---------------------
  if (isLoading) return 'loading'

  return (
    <div className="bg-white-200 container mx-auto h-screen">
      <div className="mt-24 flex items-center justify-between">
        <div>
          <p className="subtitle1 cursor-pointer text-gray-500" onClick={() => router.back()}>
            กลับ
          </p>
          <h1 className="heading3 mt-6">ข้อมูลลูกค้า</h1>
        </div>
        <Button
          color="primary"
          className="mt-6 flex h-12 items-center"
          onClick={() => Router.push(`/customer/${customerId}/contract/new`)}
          size="large">
          <i className="fa-solid fa-plus mr-2 text-xl" />
          สร้างสัญญา
        </Button>
      </div>
      <div className="mt-10 flex items-start space-x-8">
        <div className="flex w-1/4 flex-col items-center justify-center rounded-2xl bg-white px-6 py-10 shadow-card">
          <Image className="rounded-full" alt="Mountains" width={160} height={160} src={customer?.image} />
          <p className="button1 mt-4">{`${customer?.firstName} ${customer?.lastName}`}</p>
          <div className="mt-4 w-full">
            <div className="flex space-x-4">
              <i className="fa-solid fa-id-card w-5 text-grey-900" />
              <p className="body2 text-grey-800">{customer?.idCard}</p>
            </div>
            <div className="mt-4 flex space-x-4">
              <i className="fa-solid fa-phone w-5 text-grey-900" />
              <p className="body2 text-grey-700">{customer?.phone}</p>
            </div>
            <div className="mt-4 flex space-x-4">
              <i className="fa-solid fa-location-dot w-5 text-grey-900" />
              <p className="body2 text-grey-700">{customer?.address}</p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-2xl shadow-card">
          <div className="button1 rounded-t-2xl bg-grey-200 px-6 py-2">
            <Tabs tabs={tabs} />
          </div>
          <ContractListTable data={contractList?.contracts || []} isFetched={!isFetchedContract} error={errorContract} />
          <div className="flex items-center justify-between border-t px-6 py-4">
            <p className="body2 text-grey-600">Result 1-2 of 2</p>
            <div className="flex space-x-4">
              <div className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full p-2 text-grey-800 hover:bg-grey-200">
                <i className="fa-solid fa-chevron-left text-xs" />
              </div>
              <div className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full p-2 text-grey-800 hover:bg-grey-200">
                <i className="fa-solid fa-chevron-right text-xs" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerProfile
