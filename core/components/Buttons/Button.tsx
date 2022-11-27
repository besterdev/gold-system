import React, { ComponentProps } from 'react'

interface ButtonProps extends Omit<ComponentProps<'button'>, 'isLoading'> {
  isLoading?: boolean
}

const Button = ({ isLoading, children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`rounded-lg border-none bg-primary-200 inline-block px-10 text-center py-2 heading7 text-white-100 hover:bg-primary-300 ${className}`}
      {...props}>
      {!isLoading ? (
        <p>
          Loading...
          <i className="ml-2 fa-solid fa-spinner animate-spin" />
        </p>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
