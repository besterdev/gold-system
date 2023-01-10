import _ from 'lodash'
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'

let currentOTPIndex: number = 0

export interface VerifyInputProps {
  otp: string[]
  setOTO: (otp: string[]) => void
}

export const VerifyInput = ({ otp, setOTO }: VerifyInputProps) => {
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOTPIndex])

  const handleChange = (value: any): void => {
    const newOtp: string[] = [...otp]
    newOtp[currentOTPIndex] = value.substring(value.length - 1)

    if (!value) {
      setActiveOTPIndex(currentOTPIndex - 1)
    } else {
      setActiveOTPIndex(currentOTPIndex + 1)
    }

    setOTO(newOtp)
  }

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>, index: number) => {
    currentOTPIndex = index
    if (key === 'Backspace') setActiveOTPIndex(currentOTPIndex - 1)
  }

  return (
    <div className="flex items-start justify-center space-x-4">
      {_.map(otp, (data, index) => (
        <input
          key={`otp_${index}`}
          ref={index === activeOTPIndex ? inputRef : null}
          type="number"
          className="w-16 h-16 text-center bg-transparent border-2 rounded-md outline-none border-gray-120 spin-button-none focus:border-gray-600 focus:text-gray-800"
          value={data}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  )
}
