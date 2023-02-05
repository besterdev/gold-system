import React from 'react'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import _ from 'lodash'
import classNames from 'classnames'

interface TableProps {
  data: any
  columns: any
}

export const DataTable = ({ data, columns }: TableProps) => {
  const isLoading = false

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const Body = () => {
    if (isLoading)
      return (
        <tbody className="flex min-h-[520px] items-center justify-center">
          <tr>
            <td>
              <i className="text-6xl fa-solid fa-yin-yang animate-spin text-primary-300"></i>
            </td>
          </tr>
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

  return (
    <div className="w-full">
      <table className="w-full bg-white">
        <thead className="px-4">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="grid grid-cols-12 gap-4 bg-grey-200" key={headerGroup.id}>
              {headerGroup.headers.map((header: any, i) => (
                <th
                  className={classNames(`button2 py-4 text-start capitalize text-grey-600`, {
                    'pl-6': i === 0
                  })}
                  style={{
                    gridColumn: `span ${header.column.columnDef?.colspan} / span ${header.column.columnDef?.colspan}`
                  }}
                  key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <Body />
      </table>
    </div>
  )
}
