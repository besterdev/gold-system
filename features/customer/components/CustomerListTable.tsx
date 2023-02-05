import React, { useMemo } from 'react'
import Router from 'next/router'
import { ColumnDef } from '@tanstack/react-table'
import _ from 'lodash'

import { DataTable, EllipsisIconOption, ImageFallback } from '@core/components/index'

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

const CustomerListTable = ({ data }: any) => {
  const option = (customerId: string) => {
    const options = [
      {
        label: <p className="text-grey-800">view</p>,
        icon: 'fa-solid fa-eye',
        handleClick: () => Router.push(`/customer/${customerId}`)
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

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'ชื่อลูกค้า',
        colspan: 5,
        cell: ({ row }) => (
          <div className="flex items-center h-full space-x-4">
            <ImageFallback src={row.original?.image} alt={'cover_image'} className="w-12 h-12 overflow-hidden rounded-full" />
            <div className="flex flex-col space-y-1">
              <p className="text-gray-800 capitalize button2">
                {row.original?.firstName} {row.original?.lastName}
              </p>
              <div className="flex items-center justify-center space-x-2">
                <i className="text-xs fa-regular fa-address-card text-grey-600" />
                <p className="capitalize body2 text-grey-600">{row.original?.idCard}</p>
              </div>
            </div>
          </div>
        )
      },
      {
        header: 'อายุ',
        colspan: 2,
        cell: ({ row }) => <div className="flex items-center justify-start h-full space-x-4 body2 text-grey-800">{row.original.age}</div>
      },
      {
        header: 'สัญญา',
        colspan: 2,
        cell: ({ row }) => <div className="flex items-center justify-start h-full space-x-4 body2 text-grey-800">{row.original.visits}</div>
      },
      {
        header: 'Status',
        colspan: 2,
        cell: ({ row }) => <div className="flex items-center justify-start h-full space-x-4 body2 text-grey-800">{row.original.status}</div>
      },
      {
        header: ' ',
        colspan: 1,
        cell: ({ row }) => (
          <div className="flex items-center justify-end h-full col-span-1 pr-6 text-grey-800">
            <EllipsisIconOption options={option(row.original?.id)} />
          </div>
        )
      }
    ],
    []
  )

  return <DataTable columns={columns} data={data} />
}

export default CustomerListTable
