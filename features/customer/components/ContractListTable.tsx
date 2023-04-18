import React, { useMemo } from 'react'
import Router from 'next/router'
import { ColumnDef } from '@tanstack/react-table'
import _ from 'lodash'
import classNames from 'classnames'
import 'dayjs/locale/th'

import { DataTable, EllipsisIconOption } from '@core/components/index'
import { toFormatString } from 'core/utils/format'
import dayjs from 'dayjs'

type Item = {
  image: string
  name: string
}[]

type Contract = {
  createdAt: Date
  customerId: string
  id: string
  period: number
  startDate: Date
  status: boolean
  updatedAt: Date
  items: Item
}

const ContractListTable = ({ data, isFetched, error }: any) => {
  const options = (contractId: string) => {
    const options = [
      {
        label: <p className="text-grey-800">view</p>,
        icon: 'fa-solid fa-eye',
        handleClick: () => Router.push(`/customer/${Router.query?.customer_id}/contract/${contractId}`)
      },
      {
        label: <p className="text-grey-800">edit</p>,
        icon: 'fa-regular fa-pen-to-square',
        handleClick: () => Router.push('/customer/')
      },
      {
        label: <p className="text-error-300">delete</p>,
        icon: 'fa-regular fa-trash-can text-error-300',
        handleClick: () => console.log('deleted')
      }
    ]
    return options
  }

  const columns = useMemo<ColumnDef<Contract>[]>(
    () => [
      {
        header: 'เลขที่สัญญา',
        colspan: 3,
        cell: ({ row }) => (
          <div className="flex h-full items-center space-x-4">
            <p className="button2 capitalize text-grey-800">{row.original.id}</p>
          </div>
        )
      },
      {
        header: 'จำนวนเงิน',
        colspan: 2,
        cell: ({ row }) => (
          <div className="body2 flex h-full items-center justify-start text-grey-800">
            <p>{toFormatString(row.original?.balancePayment || 28000)}</p>
          </div>
        )
      },
      {
        header: 'ดอกเบี้ย',
        colspan: 2,
        cell: ({ row }) => (
          <div className="body2 flex h-full items-center justify-start text-grey-800">
            <p>{toFormatString(row.original?.interest || 8)}</p>
          </div>
        )
      },
      {
        header: 'วันที่เริ่มสัญญา',
        colspan: 2,
        cell: ({ row }) => (
          <div className="body2 flex h-full items-center justify-start space-x-4 text-grey-800">
            <p>{dayjs(row.original.startDate).locale('th').add(543, 'year').format('DD MMM YYYY')}</p>
          </div>
        )
      },
      {
        header: 'สถานะ',
        colspan: 2,
        cell: ({ row }) => (
          <div className="flex h-full items-center justify-start">
            <div
              className={classNames('rounded-md  px-2.5', {
                'bg-green-100 text-green-600': row.original?.status,
                'bg-red-100 text-red-600': !row.original?.status
              })}>
              <p className="button2">{row.original?.status ? 'เปิด' : 'ปิด'}</p>
            </div>
          </div>
        )
      },
      {
        header: ' ',
        colspan: 1,
        cell: ({ row }) => (
          <div className="col-span-1 flex h-full items-center justify-end pr-6 text-grey-800">
            <EllipsisIconOption options={options(row.original?.id)} />
          </div>
        )
      }
    ],
    []
  )

  return <DataTable columns={columns} data={data} isFetched={isFetched} error={error} />
}

export default ContractListTable
