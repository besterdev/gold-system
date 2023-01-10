import React, { useState } from 'react'

interface SearchInputProps {
  onChange: (e: string) => void
  onKeypress?: (e: any) => void
  value: string
  placeholder?: string
}

export const SearchInput = ({ onChange, onKeypress, value, placeholder }: SearchInputProps) => {
  return (
    <div className="flex items-center p-4 space-x-2 border rounded-xl">
      <i className="fa-solid fa-magnifying-glass text-grey-500" />
      <input
        className="w-full border-none outline-none body1"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value ? <i className="cursor-pointer fa-solid fa-xmark text-grey-500" onClick={() => onChange('')} /> : null}
    </div>
  )
}
