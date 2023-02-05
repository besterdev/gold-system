import React, { useRef, useState } from 'react'

import { ImageFallback } from '@core/components'
import Image from 'next/image'

interface UploadFileProps {
  image: string | null
  onSetImage: (img: string | null) => void
}

export const UploadFile = ({ image, onSetImage }: UploadFileProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(image || null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handlerClearImage = () => {
    setSelectedImage(null)
    onSetImage(null)
  }

  return (
    <div className="overflow-hidden transition duration-300 border border-dashed rounded-lg cursor-pointer border-grey-400 bg-grey-300">
      {selectedImage ? (
        <div className="relative">
          <i
            className="absolute z-10 text-3xl fa-solid fa-circle-xmark top-3 right-3 text-grey-800 hover:text-grey-600"
            onClick={handlerClearImage}
          />
          <Image
            alt="Mountains"
            src={selectedImage}
            width="0"
            height="0"
            sizes="100vw"
            className="object-cover w-full transition duration-300 h-60 hover:opacity-60"
            onClick={() => fileRef.current?.click()}
          />
        </div>
      ) : (
        <div className="flex min-h-[240px] items-center justify-between px-6 hover:opacity-60" onClick={() => fileRef.current?.click()}>
          <ImageFallback src="/image/core/dropfile.svg" alt="file" className="mr-6 h-52 w-52" />
          <div>
            <p className="heading6">Drop or Select file</p>
            <p className="mt-2 body2 text-grey-600">
              Drop files here or click browse <br /> thorough your machine
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileRef}
        hidden
        type="file"
        name="myImage"
        onChange={(event: any) => {
          if (event.target.files[0]) {
            const file = URL?.createObjectURL(event.target.files[0])
            setSelectedImage(file)
            onSetImage(file)
          }
        }}
      />
    </div>
  )
}
