import useOnClickOutside from '@core/hooks/useOnClickOutside'
import _ from 'lodash'
import React, { useRef, useState } from 'react'

export interface SelectProps {
  id: string
  label?: string
  error?: string
  className?: string
  onSelect?: Function
  options: { name: string; value: string }[]
  value: string
  disabled?: boolean
}

const inputStyles = {
  default: `border-grey-300  hover:border-grey-800 `,
  error: `border-error-300`
}

const labelStyles = {
  default: `text-grey-400`,
  error: `text-error-300`
}

export const Select = ({ id, label, error, className, options, value, disabled, onSelect, ...props }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  const handleClickOutside = () => {
    setIsOpen(false)
  }

  const handleClickInside = () => {
    setIsOpen(true)
  }

  useOnClickOutside(ref, handleClickOutside)

  const handleSelect = () => {
    onSelect
  }

  const FindValue = (value: any) => {
    return _.find(options, { value: value })
  }

  return (
    <div className={`relative ${className}`} ref={ref}>
      <div
        id={id}
        className={`text-black-500 subtitle2 flex h-14 w-full cursor-pointer appearance-none items-center rounded-md border py-4 px-4 placeholder-transparent
         shadow-sm ring-0
         focus:right-0 focus:outline-none disabled:cursor-not-allowed
         ${error ? inputStyles.error : inputStyles.default}
         ${disabled ? ` cursor-not-allowed  bg-grey-200 disabled:border-slate-200 disabled:text-slate-500 disabled:shadow-none` : null}
          `}
        {...props}
        onClick={() => !disabled && handleClickInside()}>
        <p className="subtitle2">{FindValue(value)?.name}</p>
      </div>

      <label
        htmlFor={id}
        className={`body1 absolute z-10 origin-[0] transform  bg-white px-1 duration-300
      ${isOpen || value ? `top-1.5 left-2 -translate-y-4 scale-75 text-grey-800` : `top-[18px] left-3 scale-100`}
      ${error ? labelStyles.error : labelStyles.default}
      ${disabled ? `cursor-not-allowed bg-transparent` : `cursor-pointer`}
      `}
        onClick={() => !disabled && handleClickInside()}>
        {label}
      </label>

      {isOpen ? (
        <div className="absolute z-50 w-full overflow-hidden bg-white rounded-md shadow-lg top-16">
          {_.map(options, (option) => (
            <div className="px-4 py-2 cursor-pointer hover:bg-grey-200" onClick={handleSelect}>
              {option.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
