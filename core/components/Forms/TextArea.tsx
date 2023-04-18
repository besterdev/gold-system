import { forwardRef, ComponentProps } from 'react'
import { FieldError } from 'react-hook-form'

export interface TextAreaProps extends Omit<ComponentProps<'textarea'>, 'ref' | 'color'> {
  id: string
  label?: string
  error?: string | FieldError | any
}

const inputStyles = {
  default: `border-grey-300  hover:border-grey-800 `,
  error: `border-error-300`
}

const labelStyles = {
  default: `text-grey-400 peer-focus:text-grey-800`,
  error: `text-error-300 peer-focus:text-error-300`
}

// eslint-disable-next-line react/display-name
export const TextArea = forwardRef<HTMLInputElement, TextAreaProps>(({ id, label, error, className, value, onChange, ...props }, ref) => {
  return (
    <div className={`relative ${className}`}>
      <textarea
        id={id}
        className={`text-black-500 subtitle2 peer h-32 w-full resize-none appearance-none rounded-md border py-4 px-4 placeholder-transparent shadow-sm
           ring-0 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#e7e7eb] scrollbar-track-rounded-full scrollbar-thumb-rounded-full
           focus:right-0 focus:outline-none
             disabled:cursor-not-allowed 
            disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none ${
              error ? inputStyles.error : inputStyles.default
            }`}
        placeholder=" "
        {...props}
        onChange={onChange}
        value={value}
        autoComplete="off"
      />
      <label
        htmlFor={id}
        className={`body1 absolute top-1.5 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-auto bg-white px-1  duration-300 
        peer-placeholder-shown:top-7 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1.5 peer-focus:-translate-y-4 
        peer-focus:scale-75 peer-focus:px-1
        ${error ? labelStyles.error : labelStyles.default}
        `}>
        {label}
      </label>
    </div>
  )
})
