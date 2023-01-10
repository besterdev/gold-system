import { Fragment } from 'react'
import { useDialogStore } from 'core/store/dialog'

import { Transition } from '@headlessui/react'
import { Button } from '../Buttons'
import { ImageFallback } from '../Images/ImageFallback'

export const Dialog = () => {
  const { isOpen, toggleDialog, image, content, onConfirm } = useDialogStore()

  return (
    <Transition
      className="fixed inset-0 z-50 grid w-screen h-screen transition-opacity modal place-content-center bg-black/40"
      show={isOpen}
      enter="ease-in duration-400"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-out duration-400"
      leaveFrom="opacity-100"
      leaveTo="opacity-0">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0 scale-0"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-0">
        <div id="modal" className="flex w-[460px] flex-col items-center justify-center rounded-lg bg-white p-6 shadow-xl">
          <ImageFallback src={image} alt="modal_image" className="h-52 w-52" />
          <p className="mt-10 text-center body1">{content}</p>
          <Button
            color="primary"
            className="w-full h-12 mt-10"
            onClick={async () => {
              await onConfirm()
              toggleDialog()
            }}
            size="large">
            Agree
          </Button>
        </div>
      </Transition.Child>
    </Transition>
  )
}
