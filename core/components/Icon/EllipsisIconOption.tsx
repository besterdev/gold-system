import React, { useRef, useState } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import useOnClickOutside from '@core/hooks/useOnClickOutside'

const options = [
  {
    label: <p className="text-error-300">delete</p>,
    icon: 'fa-regular fa-trash-can text-error-300',
    handleClick: () => console.log(1)
  },
  {
    label: <p className="text-grey-800">edit</p>,
    icon: 'fa-regular fa-pen-to-square',
    handleClick: () => console.log(1)
  }
]

export const EllipsisIconOption = () => {
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
        className={classNames('absolute right-12 min-w-[120px] origin-left rounded-xl bg-white p-2 shadow-2xl transition-all duration-100', {
          'scale-100': isOpen,
          'scale-0': !isOpen
        })}>
        {_.map(options, (option, i) => (
          <div
            className={classNames('body1 z-10 flex items-center justify-start space-x-4 rounded-md p-1 capitalize hover:bg-grey-200', {
              'mb-1': _.size(options) !== i
            })}
            key={`option_${i}`}>
            <i className={`${option.icon}`} />
            {option.label}
          </div>
        ))}
      </div>
    </div>
  )
}
