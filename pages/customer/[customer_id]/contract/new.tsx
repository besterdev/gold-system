import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'

import { Button, DatePicker, TextInput } from '@core/components'
import { useModalStore } from 'core/store/modal'
import AddItemModal from '@features/contract/components/AddItemModal'
import ItemListTable from '@features/contract/components/ItemListTable'
import { useState } from 'react'
import dayjs from 'dayjs'

type Item = {
  id: string
  name: string
  weight: string
  price: string
  image: string | null
}

interface FormData {
  openDate: string
  closeDate: string
  period: string
  items: Item[]
}

interface ItemFormData {
  id: string
  name: string
  weight: string
  price: string
  image: string | null
}

const schema = yup.object({
  openDate: yup.string().required('กรุณากรอกนามสกุล'),
  period: yup.string().required('กรุณากรอกระยะเวลา'),
  item: yup.array()
})

const initValue = { openDate: dayjs().format('YYYY-MM-DD'), period: '', items: [] }

const NewContractPage = () => {
  const { isOpen, toggleDialog, onConfirm } = useModalStore()
  const [item, setItem] = useState<any>(null)

  const {
    formState: { errors, isDirty, isValid },
    watch,
    setValue,
    register,
    handleSubmit
  } = useForm<FormData>({
    defaultValues: initValue,
    resolver: yupResolver(schema)
  })

  const handleSaveItem = (data: ItemFormData, isEdit: boolean) => {
    if (isEdit) {
      editItem(data)
    } else {
      addItem(data)
    }
  }

  const addItem = (data: ItemFormData) => {
    const newData = { ...data, id: _.uniqueId() }
    const itemsList = watch('items')
    itemsList.push(newData)
    setValue('items', itemsList)
  }

  const editItem = (data: Item) => {
    const itemId = data.id
    const newItems = _.map(watch('items'), (item) => (item.id === itemId ? data : item))
    setValue('items', newItems)
  }

  const deleteItem = (itemId: string) => {
    const itemsList = _.filter(watch('items'), (item) => {
      return item.id !== itemId
    })
    setValue('items', itemsList)
  }

  const handlerEditItem = (itemId: string) => {
    const item = _.find(watch('items'), (item) => {
      return item.id === itemId
    })
    setItem(item)
    toggleDialog()
  }

  const onSubmit = handleSubmit((data: FormData) => {
    console.log(data)
  })

  return (
    <div className="container h-screen mx-auto my-24 bg-white-200">
      <AddItemModal item={item} handleSaveItem={(data, isEdit) => handleSaveItem(data, isEdit)} />
      <div className="">
        <p className="heading3">สร้างสัญญา</p>
      </div>
      <div className="w-full px-6 py-10 mt-10 bg-white rounded-2xl shadow-card">
        <div className="flex items-center space-x-6">
          <div className="flex flex-col w-full">
            <DatePicker id="openDate" label="วันที่เริ่มสัญญา" value={watch('openDate')} onChange={(date: string) => console.log(date)} />
            {errors.openDate ? <p className="mt-2 body2 text-error-300">{errors.openDate.message}</p> : null}
          </div>
          <div className="w-full">
            <TextInput id="period" label="ระยะเวลาฝาก" {...register('period')} error={errors.period} />
            {errors.period ? <p className="mt-2 body2 text-error-300">{errors.period.message}</p> : null}
          </div>
        </div>
        <Button color="custom" className="h-10 px-2 mx-0 my-6 text-success-300 hover:bg-grey-200" onClick={() => toggleDialog()} size="large">
          <i className="mr-2 fa-solid fa-plus" />
          เพิ่มรายการ
        </Button>
        {_.size(watch('items')) > 0 ? <ItemListTable items={watch('items')} deleteItem={deleteItem} handlerEditItem={handlerEditItem} /> : null}
      </div>
      <div className="flex items-end justify-end mt-10">
        <Button color="primary" className="h-10" onClick={onSubmit} size="large">
          สร้าง
        </Button>
      </div>
    </div>
  )
}

export default NewContractPage
