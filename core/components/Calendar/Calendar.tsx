import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import _ from 'lodash'
import classNames from 'classnames'
import Header from './Header'

const daysInWeekEN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const daysInWeekTH = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
const days = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']

export interface CalendarProps {
  value: Date | Dayjs | null
  onChange: (date: Date | Dayjs) => void
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

  const handYear = (year: number) => {
    setDate(date.set('years', year))
    onChange(date.set('years', year))
  }

  return (
    <div className="border-gray-10 max-h-[320px] w-[302px] rounded-lg bg-white py-4 shadow-md ">
      <Header
        language="th"
        date={date}
        type={type}
        setType={() => setType(type === 'day' ? 'year' : 'day')}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />

      {type === 'day' ? (
        <div className="body2 grid grid-cols-7 items-center justify-center gap-x-1 gap-y-1 px-7">
          {_.map(days, (day: any) => (
            <p className="body2 caption3 h-8 w-8 cursor-default text-center text-gray-400" key={day}>
              {day}
            </p>
          ))}
          {_.map(_.range(firstWeekOfMonth), (day: any) => (
            <div key={day} />
          ))}
          {_.map(_.range(daysInMonth), (day: any) => (
            <div
              className={classNames('relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-center', {
                'bg-primary-300 text-white': dayjs(value).format('YYYY-MM-DD') === date.set('date', day + 1).format('YYYY-MM-DD'),
                'border border-grey-500': dayjs(currentDate).format('YYYY-MM-DD') === date.set('date', day + 1).format('YYYY-MM-DD')
              })}
              key={day}
              onClick={() => onChange(date.set('date', day + 1))}>
              <p>{day + 1}</p>
            </div>
          ))}
          {_.map(_.range(lastWeekOfMonth), (day: any) => (
            <div key={day} />
          ))}
        </div>
      ) : null}

      {type === 'year' ? (
        <div className="body1 scrollbar-customer grid h-[220px] grid-cols-4 items-center justify-center gap-x-1 gap-y-1 overflow-y-scroll px-7">
          {_.map(_.range(200), (year: number) => (
            <div
              className={classNames('w-full cursor-pointer text-center', {
                'bg-primary-300 text-white':
                  dayjs(date)
                    .set('years', year + 2000)
                    .get('year') === date.get('year')
              })}
              key={`mount_${year}`}
              onClick={() => handYear(year + 2500 - 543)}>
              {year + 2500}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Calendar
