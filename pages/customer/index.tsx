import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'usehooks-ts'
import _ from 'lodash'

import { getCustomers } from 'core/service/customer'
import AuthMiddleware from 'core/middleware/AuthMiddleware'

import { Button, SearchInput } from '@core/components'
import CustomerListTable from '@features/customer/components/CustomerListTable'
import Pagination from '@core/components/Table/Pagination'

//---------------------
// VARIABLE
//---------------------
const initialQuery = {
  page: 1,
  limit: 10,
  searchWord: ''
}

const Customer = () => {
  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter()

  //---------------------
  // STATE
  //---------------------
  const [query, setQuery] = useState(initialQuery)

  //---------------------
  // HOOKS
  //---------------------
  const searchWord = useDebounce<string>(query.searchWord, 800)
  const page = query.page

  //---------------------
  // QUERY DATA
  //---------------------
  const { data, isFetched, error } = useQuery({
    queryKey: ['customers', { searchWord, page }],
    keepPreviousData: true,
    queryFn: async () => getCustomers(query)
  })

  //---------------------
  // HANDLER
  //---------------------
  const handlePrev = () => {
    if (query.page > 1) {
      setQuery({ ...query, page: page - 1 })
    }
  }

  const handleNext = () => {
    if (query.page < data?.totalPage) {
      setQuery({ ...query, page: page + 1 })
    }
  }

  const onChangeSearchWord = (searchWord: string) => {
    setQuery({ ...query, page: 1, searchWord: searchWord })
  }

  //---------------------
  // RENDER
  //---------------------
  return (
    <AuthMiddleware>
      <div className="bg-white-200 container mx-auto grid h-screen w-screen">
        <main className="flex w-full flex-col justify-start px-40 pt-20 pb-10">
          <div className="mb-10 flex justify-between">
            <p className="heading3 text-grey-800">รายการลูกค้า</p>
            <Button onClick={() => router.push('/customer/new')} size="large" className="h-12">
              <i className="fa-solid fa-plus mr-2" />
              เพิ่มข้อมูลลูกค้า
            </Button>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white shadow-card">
            <div className="w-full p-6 ">
              <SearchInput placeholder="ค้าหาชื่อลูกค้า หรือ เลขบัตรประชาชน" value={query.searchWord} onChange={onChangeSearchWord} />
            </div>
            <CustomerListTable data={data?.customers || []} isFetched={!isFetched} error={error} searchWord={searchWord} />
            <Pagination
              page={query.page}
              dataSize={_.size(data?.customers)}
              totalCount={data?.totalCount}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </div>
        </main>
      </div>
    </AuthMiddleware>
  )
}

export default Customer
