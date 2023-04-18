import React from 'react'
import { flexRender, Table } from '@tanstack/react-table'
import classNames from 'classnames'
import Image from 'next/image'

interface BodyProps {
  table: Table<unknown>
  isFetched: boolean
  error: unknown
}

const Body = ({ table, isFetched, error }: BodyProps) => {
  if (isFetched)
    return (
      <tbody className="flex min-h-[520px] items-center justify-center">
        <tr>
          <td>
            <i className="fa-solid fa-yin-yang animate-spin text-6xl text-primary-300" />
          </td>
        </tr>
      </tbody>
    )

  if (error)
    return (
      <tbody className="flex min-h-[520px] items-center justify-center">
        <Image src="/image/core/error.svg" alt="" width="300" height="300" />
      </tbody>
    )
  return (
    <tbody>
      {table.getRowModel().rows.map((row: any) => (
        <tr className="grid grid-cols-12 gap-4" key={row.id}>
          {row.getVisibleCells().map((cell: any, i: any) => (
            <td
              className={classNames('py-4', {
                'pl-6': i === 0
              })}
              style={{
                gridColumn: `span ${cell.column.columnDef?.colspan} / span ${cell.column.columnDef?.colspan}`
              }}
              key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default Body
