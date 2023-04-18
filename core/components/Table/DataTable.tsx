import React from 'react'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import Header from './Header'
import Body from './Body'

interface TableProps {
  data: any
  columns: any
  isFetched?: boolean
  error?: boolean
}

export const DataTable = ({ data, columns, isFetched = false, error }: TableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <table className="w-full bg-white">
      <Header table={table} />
      <Body isFetched={isFetched} error={error} table={table} />
    </table>
  )
}
