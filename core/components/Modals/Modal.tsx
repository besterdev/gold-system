import React, { Fragment, ReactElement } from 'react'
import { Transition } from '@headlessui/react'
import { useModalStore } from 'core/store/modal'

interface ModalProps {
  children: ReactElement
}
export const Modal = ({ children }: ModalProps) => {
  const { isOpen } = useModalStore()

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
        <div id="modal" className="flex min-w-[460px] flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-xl">
          {children}
        </div>
      </Transition.Child>
    </Transition>
  )
}
