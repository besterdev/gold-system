import React, { ChangeEvent, useRef, useState } from 'react'

import { ImageFallback } from '@core/components'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { uploadFile } from 'core/service'

interface UploadFileProps {
  // image: string | null
  image: Image | null
  onChange: (img: Image | null) => void
}

type Image = {
  url: string
  file: File
}

export const UploadFile = ({ image, onChange }: UploadFileProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(image?.url || null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handlerClearImage = () => {
    setSelectedImage(null)
    onChange(null)
  }

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement
    if (!input?.files?.length) {
      return
    }

    const file: any = input.files[0]
    if (file) {
      const url = URL?.createObjectURL(file)
      onChange({ file: file, url: url })
      setSelectedImage(url)
    }
  }

  const useUploadForm = useMutation((data: any) => uploadFile(data), {
    onSuccess: (data) => {
      console.log(data)
    }
  })

  return (
    <div className="cursor-pointer overflow-hidden rounded-lg border border-dashed border-grey-400 bg-grey-300 transition duration-300">
      {selectedImage ? (
        <div className="relative">
          <i
            className="fa-solid fa-circle-xmark absolute top-3 right-3 z-10 text-3xl text-grey-800 hover:text-grey-600"
            onClick={handlerClearImage}
          />
          <Image
            alt="Mountains"
            src={selectedImage}
            width="0"
            height="0"
            sizes="100vw"
            className="h-60 w-full object-cover transition duration-300 hover:opacity-60"
            onClick={() => fileRef.current?.click()}
          />
        </div>
      ) : (
        <div className="flex min-h-[240px] items-center justify-between px-6 hover:opacity-60" onClick={() => fileRef.current?.click()}>
          <ImageFallback src="/image/core/dropfile.svg" alt="file" className="mr-6 h-52 w-52" />
          <div>
            <p className="heading6">Drop or Select file</p>
            <p className="body2 mt-2 text-grey-600">
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
        multiple
        // onChange={(event: any) => {
        //   if (event.target.files[0]) {
        //     const file = URL?.createObjectURL(event.target.files[0])
        //     setSelectedImage(file)
        //     onSetImage(file)
        //   }
        // }}
        onChange={handleFileInputChange}
      />
    </div>
  )
}
