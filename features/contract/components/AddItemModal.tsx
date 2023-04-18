import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useModalStore } from 'core/store/modal'

import { TextInput, UploadFile, Modal, Button } from '@core/components'

interface AddItemModalProps {
  item: FormData | null
  handleSaveItem: (data: FormData, isEdit: boolean) => void
}

interface FormData {
  id: string
  name: string
  weight: string
  price: string
  image: Image | null
}

type Image = {
  url: string
  file: File
}

const schema = yup.object({
  name: yup.string().required('กรุณากรอกชื่อ'),
  weight: yup.string().required('กรุณากรอกน้ำหนัก'),
  price: yup.string().required('กรุณากรอกราคา')
})

const initValue = { name: '', weight: '', price: '', image: null }

const AddItemModal = ({ handleSaveItem, item }: AddItemModalProps) => {
  const [isEdit, setIsEdit] = useState(false)

  const { toggleDialog } = useModalStore()

  useEffect(() => {
    if (item) {
      reset(item)
      setIsEdit(true)
    }
  }, [item])

  const {
    formState: { errors },
    watch,
    setValue,
    register,
    reset,
    handleSubmit
  } = useForm<FormData>({
    defaultValues: initValue,
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data: FormData) => {
    handleSaveItem(data, isEdit)
    handlerClose()
  })

  const handlerClose = () => {
    reset(initValue)
    setIsEdit(false)
    toggleDialog()
  }

  return (
    <Modal>
      <div className="w-[480px]">
        <h1 className="heading5"> {isEdit ? 'แก้ไขรายการ' : 'เพิ่มรายการ'}</h1>
        <div className="mt-6 mb-6 flex flex-col space-y-4">
          <div className="w-full">
            <TextInput id="firstName" label="รายการ" {...register('name')} error={errors.name} />
            {errors.name ? <p className="body2 mt-2 text-error-300">{errors.name.message}</p> : null}
          </div>
          <div className="w-full">
            <TextInput id="firstName" label="น้ำหนัก" {...register('weight')} error={errors.weight} />
            {errors.weight ? <p className="body2 mt-2 text-error-300">{errors.weight.message}</p> : null}
          </div>
          <div className="w-full">
            <TextInput id="firstName" label="ราคา" {...register('price')} error={errors.price} />
            {errors.price ? <p className="body2 mt-2 text-error-300">{errors.price.message}</p> : null}
          </div>
        </div>
        <p className="heading7 mb-2 text-grey-800">image</p>
        <UploadFile image={watch('image')} onChange={(img) => setValue('image', img)} />
        <div className="mt-6 flex items-end justify-end space-x-4">
          <Button color="custom" className="h-10 text-success-300 hover:bg-grey-200" onClick={handlerClose} size="large">
            ยกเลิก
          </Button>
          <Button color="primary" className="h-10" onClick={onSubmit} size="large">
            {isEdit ? 'แก้ไขรายการ' : 'เพิ่มรายการ'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default AddItemModal
