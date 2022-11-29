import React, { ReactNode } from 'react'
import useRipple from '@core/hooks/useRipple'

interface ButtonProps {
  color?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  isLoading?: boolean
  children?: ReactNode
  className?: string
  onClick: Function
}

const colorStyle = {
  primary: `bg-primary-300 text-white hover:bg-primary-400`,
  secondary: `bg-secondary-300 text-white hover:bg-secondary-400`
}

const sizeStyle = {
  small: `px-2.5 py-1`,
  medium: `px-4 py-1.5`,
  large: `px-6 py-2`
}

export const Button = ({ color = 'primary', size = 'medium', isLoading, children, className, onClick, ...props }: ButtonProps) => {
  const { coords, setCoords, isRippling } = useRipple()

  return (
    <button
      className={`relative rounded-lg ripple-button border-none inline-block text-center py-1.5 heading7 text-white-100 overflow-hidden ${className} ${colorStyle[color]} ${sizeStyle[size]}`}
      onClick={(e: any) => {
        const position = e?.target?.getBoundingClientRect()
        setCoords({ x: e.clientX - position.left, y: e.clientY - position.top })
        onClick && onClick(e)
      }}
      {...props}>
      {isRippling ? (
        <span
          className="w-6 h-6 absolute block bg-white/60 rounded-full after:content=[''] opacity-100 animate-ripple"
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
