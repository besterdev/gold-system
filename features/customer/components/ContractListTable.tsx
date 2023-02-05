import React, { useMemo } from 'react'
import Router from 'next/router'
import { ColumnDef } from '@tanstack/react-table'
import _ from 'lodash'
import classNames from 'classnames'

import { DataTable, EllipsisIconOption } from '@core/components/index'
import { toFormatString } from 'core/utils/format'

type Item = {
  image: string
  name: string
}[]

type Contract = {
  contractId: string
  item: Item
  status: 'active' | 'close'
  balancePayment: number
  interest: number
  openDate: string
  closeDate: string
}

const ContractListTable = ({ data }: any) => {
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
          <div className="flex items-center h-full space-x-4">
            <p className="capitalize button2 text-grey-800">{row.original.contractId}</p>
          </div>
        )
      },
      {
        header: 'จำนวนเงิน',
        colspan: 2,
        cell: ({ row }) => (
          <div className="flex items-center justify-start h-full body2 text-grey-800">
            <p>{toFormatString(row.original.balancePayment)}</p>
          </div>
        )
      },
      {
        header: 'ดอกเบี้ย',
        colspan: 2,
        cell: ({ row }) => (
          <div className="flex items-center justify-start h-full body2 text-grey-800">
            <p>{toFormatString(row.original.interest)}</p>
          </div>
        )
      },
      {
        header: 'วันที่เริ่มสัญญา',
        colspan: 2,
        cell: ({ row }) => (
          <div className="flex items-center justify-start h-full space-x-4 body2 text-grey-800">
            <p>{row.original.openDate}</p>
          </div>
        )
      },
      {
        header: 'สถานะ',
        colspan: 2,
        cell: ({ row }) => (
          <div className="flex items-center justify-start h-full">
            <div
              className={classNames('rounded-md  px-2.5', {
                'bg-green-100 text-green-600': row.original?.status === 'active',
                'bg-red-100 text-red-600': row.original?.status === 'close'
              })}>
              <p className="button2">{row.original?.status === 'active' ? 'เปิด' : 'ปิด'}</p>
            </div>
          </div>
        )
      },
      {
        header: ' ',
        colspan: 1,
        cell: ({ row }) => (
          <div className="flex items-center justify-end h-full col-span-1 pr-6 text-grey-800">
            <EllipsisIconOption options={options(row.original?.contractId)} />
          </div>
        )
      }
    ],
    []
  )

  return <DataTable columns={columns} data={data} />
}

export default ContractListTable
