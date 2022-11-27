import { forwardRef, ComponentProps } from 'react'

export interface TextInputProps extends Omit<ComponentProps<'input'>, 'ref' | 'color'> {
  label?: string
  error?: string
}

const inputStyles = {
  default: `focus:border-primary-200 focus:ring-primary-200`,
  error: `focus:border-red-200 focus:ring-red-200 border-red-200`
}

const labelStyles = {
  default: `text-black-200`,
  error: `text-red-300`
}

// eslint-disable-next-line react/display-name
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ label, error, className, ...props }, ref) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={label} className={`heading6 mb-2 text-black-400 ${error ? labelStyles.error : labelStyles.default}`}>
        {label}
      </label>
      <input
        {...props}
        ref={ref}
        className={`heading6 disabled:shadow-none" h-10 rounded-md border-2 px-4 text-black-500 
                  placeholder-grey-200 shadow-sm 
                    focus:outline-none focus:ring-1 
                    disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 ${
                      error ? inputStyles.error : inputStyles.default
                    }`}
      />
      <label htmlFor={error} className="body1 mt-2 text-red-200">
        {error}
      </label>
    </div>
  )
})

export default TextInput
