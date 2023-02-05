import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import _ from 'lodash'
import classNames from 'classnames'
import Header from './Header'

const daysInWeekEN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const daysInWeekTH = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
const days = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']

export interface CalendarProps {
  value: string
  onChange: (date: string) => any
}

const Calendar = ({ value, onChange }: CalendarProps) => {
  const [date, setDate] = useState(dayjs())
  const [type, setType] = useState('day')

  useEffect(() => {
    value && setDate(dayjs(value))
  }, [])

  const currentDate = dayjs()
  const year = date.year()
  const month = date.month()
  const daysInMonth = date.daysInMonth()
  const dateOfOne = dayjs(`${year}-${month + 1}-1`)
  const firstWeekOfMonth = dateOfOne.day()
  const dateOfLast = dayjs(`${year}-${month + 1}-${daysInMonth}`)
  const lastWeekOfMonth = dateOfLast.day()

  const handlePrev = () => {
    setDate(date.subtract(1, 'month'))
  }

  const handleNext = () => {
    setDate(date.add(1, 'month'))
  }

  return (
    <div className="border-gray-10 w-[302px] rounded-lg bg-white py-4 shadow-md">
      <Header
        language="th"
        date={date}
        type={type}
        setType={() => setType(type === 'day' ? 'year' : 'day')}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
      <div className="grid items-center justify-center grid-cols-7 gap-2 px-7">
        {_.map(days, (day: any) => (
          <p className="w-8 h-8 text-center text-gray-400 cursor-default body2 caption3" key={day}>
            {day}
          </p>
        ))}
      </div>

      <div className="grid items-center justify-center grid-cols-7 body2 gap-x-1 gap-y-1 px-7">
        {_.map(_.range(firstWeekOfMonth), (day: any) => (
          <div key={day} />
        ))}
        {_.map(_.range(daysInMonth), (day: any) => (
          <div
            className={classNames('relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-center', {
              'bg-primary-300 text-white': value === date.set('date', day + 1).format('YYYY-MM-DD'),
              'border border-grey-500': dayjs(currentDate).format('YYYY-MM-DD') === date.set('date', day + 1).format('YYYY-MM-DD')
            })}
            key={day}
            onClick={() => onChange(date.set('date', day + 1).format('YYYY-MM-DD'))}>
            <p>{day + 1}</p>
          </div>
        ))}
        {_.map(_.range(lastWeekOfMonth), (day: any) => (
          <div key={day} />
        ))}
      </div>
    </div>
  )
}

export default Calendar
