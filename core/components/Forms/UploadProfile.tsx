/* eslint-disable react/jsx-no-duplicate-props */
import Image from 'next/image'
import React, { useRef, useState } from 'react'

export const UploadProfile = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="p-2 border-2 border-dotted rounded-full">
      <div className="overflow-hidden rounded-full h-36 w-36">
        {selectedImage ? (
          <div className="relative w-full h-full cursor-pointer group" onClick={() => fileRef.current?.click()}>
            <Image alt="Mountains" fill sizes="100vw" src={selectedImage} />
            <div className="flex flex-col items-center justify-center w-full h-full space-y-2 scale-0 bg-black/40 group-hover:scale-100">
              <i className="text-xl text-white fa-solid fa-camera" />
              <p className="text-white body2">Upload photo</p>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center w-full h-full space-y-2 cursor-pointer gro group bg-grey-200 hover:bg-black/20"
            onClick={() => fileRef.current?.click()}>
            <i className="text-xl text-gray-400 fa-solid fa-camera group-hover:text-white" />
            <p className="text-gray-400 body2 group-hover:text-white">Upload photo</p>
          </div>
        )}
        <br />
        <br />
        <input
          ref={fileRef}
          hidden
          type="file"
          name="myImage"
          onChange={(event: any) => {
            if (event.target.files[0]) {
              const file = URL?.createObjectURL(event.target.files[0])
              setSelectedImage(file)
            }
          }}
        />
      </div>
    </div>
  )
}
