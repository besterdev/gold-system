import React from 'react'
import { flexRender, Table } from '@tanstack/react-table'
import classNames from 'classnames'

interface HeaderProps {
  table: Table<unknown>
}

const Header = ({ table }: HeaderProps) => {
  return (
    <thead className="px-4">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr className="grid grid-cols-12 gap-4 bg-grey-200" key={headerGroup.id}>
          {headerGroup.headers.map((header: any, i: number) => (
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
  )
}

export default Header
