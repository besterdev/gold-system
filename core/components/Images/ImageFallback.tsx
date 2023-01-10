import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/legacy/image'

export interface ImageFallbackProps {
  src: string
  alt: string
  fallBackSrc?: string | StaticImageData
  placeholder?: 'empty' | 'blur'
  className?: string
}

const defaultImage = '/vercel.svg'

export const ImageFallback = ({ src, alt, fallBackSrc = defaultImage, placeholder = 'blur', className }: ImageFallbackProps) => {
  const [imageError, setImageError] = useState(false)
  const [imageIsLoaded, setImageIsLoaded] = useState(true)
  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageError || !src ? fallBackSrc : src}
        alt={alt}
        layout="fill"
        // objectFit="cover"
        placeholder={placeholder}
        sizes="64px"
        className={`transition-all duration-150 ${imageIsLoaded ? 'animate-pulse' : ''}`}
        onLoadingComplete={() => setImageIsLoaded(false)}
        blurDataURL={defaultImage}
        onError={() => setImageError(true)}
      />
    </div>
  )
}
