import React, { useRef, useState } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import useOnClickOutside from '@core/hooks/useOnClickOutside'

interface EllipsisIconOptionProps {
  options: { label: any; icon: string; handleClick: () => void }[]
}

export const EllipsisIconOption = ({ options }: EllipsisIconOptionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  const handleClickOutside = () => {
    setIsOpen(false)
  }

  const handleClickInside = () => {
    setIsOpen(true)
  }

  useOnClickOutside(ref, handleClickOutside)

  return (
    <div
      className="relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-grey-200"
      ref={ref}
      onClick={() => handleClickInside()}>
      <i className="fa-solid fa-ellipsis-vertical" />
      <div
        className={classNames(
          'absolute right-12 top-0 z-10 min-w-[120px] origin-left rounded-xl bg-white p-2 shadow-2xl transition-all duration-100',
          {
            'scale-100': isOpen,
            'scale-0': !isOpen
          }
        )}>
        <div className="absolute w-0 h-0 border-t-8 border-b-8 border-l-8 -right-2 border-t-transparent border-l-white border-b-transparent" />
        {_.map(options, (option, i) => (
          <div
            className={classNames('body1 z-10 flex items-center justify-start space-x-4 rounded-md p-1 capitalize hover:bg-grey-200', {
              'mb-1': _.size(options) !== i
            })}
            key={`option_${i}`}
            onClick={option.handleClick}>
            <i className={`${option.icon}`} />
            {option.label}
          </div>
        ))}
      </div>
    </div>
  )
}
