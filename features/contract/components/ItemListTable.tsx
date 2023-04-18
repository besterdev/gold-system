import React, { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import _ from 'lodash'

import { DataTable, EllipsisIconOption } from '@core/components/index'
import { toFormatString } from 'core/utils/format'
import Image from 'next/image'

type Items = {
  id: string
  name: string
  weight: string
  price: string
  image: Image | null
}

type Image = {
  url: string
  file: File
}

interface ItemListTableProps {
  items: Items[]
  handlerEditItem: (id: string) => void
  deleteItem: (id: string) => void
}

const ItemListTable = ({ items, handlerEditItem, deleteItem }: ItemListTableProps) => {
  const options = (itemId: string) => {
    const options = [
      {
        label: <p className="text-grey-800">edit</p>,
        icon: 'fa-regular fa-pen-to-square',
        handleClick: () => handlerEditItem(itemId)
      },
      {
        label: <p className="text-error-300">delete</p>,
        icon: 'fa-regular fa-trash-can text-error-300',
        handleClick: () => deleteItem(itemId)
      }
    ]
    return options
  }

  const columns = useMemo<ColumnDef<Items>[]>(
    () => [
      {
        header: 'ลำดับ',
        colspan: 2,
        cell: ({ row }) => (
          <div className="flex h-full items-center space-x-4">
            <p className="button2 capitalize text-grey-800">{row.index + 1}</p>
          </div>
        )
      },
      {
        header: 'รายการ',
        colspan: 2,
        cell: ({ row }) => (
          <div className="body2 flex h-full items-center justify-start text-grey-800">
            <p>{row.original.name}</p>
          </div>
        )
      },
      {
        header: 'น้ำหนัก',
        colspan: 2,
        cell: ({ row }) => (
          <div className="body2 flex h-full items-center justify-start text-grey-800">
            <p>{toFormatString(Number(row.original.weight))}</p>
          </div>
        )
      },
      {
        header: 'ราคา',
        colspan: 2,
        cell: ({ row }) => (
          <div className="body2 flex h-full items-center justify-start space-x-4 text-grey-800">
            <p>{row.original.price}</p>
          </div>
        )
      },
      {
        header: 'รูปภาพ',
        colspan: 2,
        cell: ({ row }) => (
          <div className="body2 flex h-full items-center justify-start space-x-4 text-grey-800">
            <Image
              alt="Mountains"
              src={row.original?.image?.url || 'https://api.lorem.space/image/fashion?w=150&h=150&r=1y'}
              width="0"
              height="0"
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
        )
      },
      {
        header: ' ',
        colspan: 2,
        cell: ({ row }) => (
          <div className="col-span-1 flex h-full items-center justify-end pr-6 text-grey-800">
            <EllipsisIconOption options={options(row.original.id)} />
          </div>
        )
      }
    ],
    []
  )

  return <DataTable columns={columns} data={items} />
}

export default ItemListTable
