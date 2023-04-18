import React, { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'

interface UploadProfileProps {
  onChange: (file: File) => void
}

export const UploadProfile = ({ onChange }: UploadProfileProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement
    if (!input?.files?.length) {
      return
    }

    const file = input.files[0]
    if (file) {
      onChange(file)
    }

    previewFile(file)
  }

  const previewFile = (file: File) => {
    const reader: any = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setSelectedImage(reader.result)
    }
  }

  return (
    <div className="rounded-full border-2 border-dotted p-2">
      <div className="h-36 w-36 overflow-hidden rounded-full">
        {selectedImage ? (
          <div className="group relative h-full w-full cursor-pointer" onClick={() => fileRef.current?.click()}>
            <Image alt="Mountains" fill sizes="100vw" src={selectedImage} />
            <div className="flex h-full w-full scale-0 flex-col items-center justify-center space-y-2 bg-black/40 group-hover:scale-100">
              <i className="fa-solid fa-camera text-xl text-white" />
              <p className="body2 text-white">Upload photo</p>
            </div>
          </div>
        ) : (
          <div
            className="gro group flex h-full w-full cursor-pointer flex-col items-center justify-center space-y-2 bg-grey-200 hover:bg-black/20"
            onClick={() => fileRef.current?.click()}>
            <i className="fa-solid fa-camera text-xl text-gray-400 group-hover:text-white" />
            <p className="body2 text-gray-400 group-hover:text-white">Upload photo</p>
          </div>
        )}
        <br />
        <br />
        <input ref={fileRef} hidden type="file" name="myImage" onChange={handleFileInputChange} />
      </div>
    </div>
  )
}
