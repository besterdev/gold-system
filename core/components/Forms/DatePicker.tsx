import React, { useRef, useState } from 'react'
import useOnClickOutside from '@core/hooks/useOnClickOutside'
import Calendar from '../Calendar/Calendar'
import dayjs from 'dayjs'
import 'dayjs/locale/th'

interface DatePickerProps {
  id: string
  label?: string
  error?: string
  className?: string
  value: string
  disabled?: boolean
  onChange: (date: string) => void
}

const inputStyles = {
  default: `border-grey-300  hover:border-grey-800 `,
  error: `border-error-300`
}

const labelStyles = {
  default: `text-grey-400`,
  error: `text-error-300`
}

export const DatePicker = ({ id, label, className, error, value, disabled, onChange, ...props }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const calendarRef = useRef(null)
  const ref = useRef(null)

  const handleClickOutside = () => {
    setIsOpen(false)
  }

  const handleClickInside = () => {
    setIsOpen(true)
  }

  useOnClickOutside(calendarRef, handleClickOutside)

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
        <p className="subtitle2">{dayjs(value).locale('th').add(543, 'year').format('DD MMM YY')}</p>
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
        <div ref={calendarRef} className="absolute z-50 mt-2 w-[302px] overflow-visible">
          <Calendar value={value} onChange={onChange} />
        </div>
      ) : null}
    </div>
  )
}
