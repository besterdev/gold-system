import classNames from 'classnames'
import React from 'react'
import 'dayjs/locale/th'
import { Dayjs } from 'dayjs'

interface HeaderCalendarProps {
  language: string
  date: Dayjs
  handlePrev?: () => void
  handleNext?: () => void
  type: string
  setType: Function
}

const Header = ({ language, date, handlePrev, handleNext, type, setType }: HeaderCalendarProps) => {
  return (
    <div className={classNames('flex items-center justify-between px-9 pb-5')}>
      <div className="flex items-center justify-center space-x-1">
        <p className="cursor-default button1 text-grey-800">
          {language === 'th' ? date.locale('th').add(543, 'year').format('MMMM YYYY') : date.format('MMMM YYYY')}
        </p>
        <div
          className={classNames('group right-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-grey-200')}
          onClick={() => setType()}>
          <i
            className={classNames('fas fa-chevron-down group-hover:text-primary-50 text-xs text-grey-600 transition-all duration-300', {
              'rotate-180': type === 'year'
            })}
          />
        </div>
      </div>
      <div className={classNames('flex')}>
        <button
          className={classNames('hover:bg-gray-10 group right-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full', {})}
          data-cy="core-select-calendar-prev"
          onClick={handlePrev}>
          <i className="text-xs text-gray-70 fas fa-chevron-left group-hover:text-primary-50" />
        </button>

        <button
          className={classNames('hover:bg-gray-10 group right-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full', {})}
          data-cy="core-select-calendar-next"
          onClick={handleNext}>
          <i className="text-xs text-gray-70 fas fa-chevron-right group-hover:text-primary-50" />
        </button>
      </div>
    </div>
  )
}

export default Header
