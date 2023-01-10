import React, { ReactNode } from 'react'
import useRipple from '@core/hooks/useRipple'

interface ButtonProps {
  color?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  isLoading?: boolean
  children?: ReactNode
  className?: string
  onClick: () => void
  disabled?: boolean
}

const colorStyle = {
  primary: `bg-primary-300 text-white hover:bg-primary-400`,
  secondary: `bg-secondary-300 text-white hover:bg-secondary-400`,
  disabled: `bg-grey-800 text-white cursor-not-allowed`
}

const sizeStyle = {
  small: `px-2.5 py-1`,
  medium: `px-4 py-1.5`,
  large: `px-6 py-2`
}

export const Button = ({ color = 'primary', size = 'medium', isLoading, children, className, disabled = false, onClick, ...props }: ButtonProps) => {
  const { coords, setCoords, isRippling } = useRipple()

  return (
    <button
      className={`ripple-button heading7 text-white-100 relative inline-block overflow-hidden rounded-lg border-none py-1.5 text-center ${className} ${
        colorStyle[disabled ? 'disabled' : color]
      } ${sizeStyle[size]}`}
      onClick={(e: any) => {
        const position = e?.target?.getBoundingClientRect()
        setCoords({ x: e.clientX - position.left, y: e.clientY - position.top })
        onClick && onClick()
      }}
      {...props}
      disabled={disabled}>
      {isRippling ? (
        <span
          className="after:content=[''] absolute block h-6 w-6 animate-ripple rounded-full bg-white/60 opacity-100"
          style={{
            left: coords.x,
            top: coords.y
          }}
        />
      ) : null}
      {isLoading ? <i className="fa-solid fa-spinner animate-spin" /> : <div className="relative z-20">{children}</div>}
    </button>
  )
}
