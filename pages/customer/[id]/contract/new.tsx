import { useState } from 'react'
import { useForm } from 'react-hook-form'
import dayjs, { Dayjs } from 'dayjs'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { useMutation } from '@tanstack/react-query'

import { createContract, uploadFile } from 'core/service'

import { Button, DatePicker, TextInput } from '@core/components'
import { useModalStore } from 'core/store/modal'
import AddItemModal from '@features/contract/components/AddItemModal'
import ItemListTable from '@features/contract/components/ItemListTable'

type Item = {
  id: string
  name: string
  weight: string
  price: string
  image: Image | null
}

interface FormData {
  startDate: Date | Dayjs | null
  closeDate: string
  period: string
  items: Item[]
}

interface ItemFormData {
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
  startDate: yup.string().required('กรุณากรอกนามสกุล'),
  period: yup.string().required('กรุณากรอกระยะเวลา'),
  item: yup.array()
})

const initValueNewContract = { startDate: dayjs().format(), period: '', items: [] }

const NewContractPage = () => {
  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter()
  const customerId = router.query.id as string

  //---------------------
  // STATE
  //---------------------
  const { isOpen, toggleDialog, onConfirm } = useModalStore()
  const [item, setItem] = useState<any>(null)
  const [fileArray, setFileArray] = useState([])

  const {
    formState: { errors, isDirty, isValid },
    watch,
    setValue,
    register,
    handleSubmit
  } = useForm<FormData>({
    defaultValues: initValueNewContract,
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
    const items = watch('items')
    const newItems = _.map(items, (item) => (item.id === itemId ? data : item))
    setValue('items', newItems)
  }

  const deleteItem = (itemId: string) => {
    const itemsList = _.filter(watch('items'), (item) => {
      return item.id !== itemId
    })
    setValue('items', itemsList)
  }

  const handlerEditItem = (itemId: string) => {
    const items = watch('items')
    const item = _.find(items, (item) => {
      return item.id === itemId
    })
    setItem(item)
    toggleDialog()
  }

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const onSubmit = handleSubmit(async (data: FormData) => {
    let cloneData: any = _.cloneDeep(data)
    let formData = new FormData()

    await _.forEach(cloneData.items, (item: any) => formData.append('files', item.image?.file))
    const items = await _.map(cloneData.items, (item: any) => ({ name: item.name, price: Number(item.price), weight: Number(item.weight) }))
    cloneData.items = items
    cloneData.customerId = customerId
    cloneData.userId = 1
    formData.append('contract', JSON.stringify(cloneData))
    useSubmitContractForm.mutate(formData)
  })

  const useSubmitContractForm = useMutation((data: any) => createContract(data), {
    onSuccess: (data) => {
      const contractId = data
      router.push(`/customer/${customerId}/contract/${contractId}`)
    }
  })

  const useUploadForm = useMutation((data: any) => uploadFile(data), {
    onSuccess: (data) => {
      console.log(data)
    }
  })

  return (
    <div className="bg-white-200 container mx-auto my-24 h-screen">
      <AddItemModal item={item} handleSaveItem={(data, isEdit) => handleSaveItem(data, isEdit)} />
      <p className="subtitle1 cursor-pointer text-gray-500" onClick={() => router.back()}>
        กลับ
      </p>
      <div className="mt-6">
        <p className="heading3">สร้างสัญญา</p>
      </div>
      <div className="mt-10 w-full rounded-2xl bg-white px-6 py-10 shadow-card">
        <div className="flex items-center space-x-6">
          <div className="flex w-full flex-col">
            <DatePicker id="startDate" label="วันที่เริ่มสัญญา" value={watch('startDate')} onChange={(date) => setValue('startDate', date)} />
            {errors.startDate ? <p className="body2 mt-2 text-error-300">{errors.startDate.message}</p> : null}
          </div>
          <div className="w-full">
            <TextInput id="period" label="ระยะเวลาฝาก" {...register('period')} error={errors.period} />
            {errors.period ? <p className="body2 mt-2 text-error-300">{errors.period.message}</p> : null}
          </div>
        </div>

        <Button color="custom" className="mx-0 my-6 h-10 px-2 text-success-300 hover:bg-grey-200" onClick={() => toggleDialog()} size="large">
          <i className="fa-solid fa-plus mr-2" />
          เพิ่มรายการ
        </Button>
        {_.size(watch('items')) > 0 ? <ItemListTable items={watch('items')} deleteItem={deleteItem} handlerEditItem={handlerEditItem} /> : null}
      </div>
      <div className="mt-10 flex items-end justify-end">
        <Button color="primary" className="h-10" onClick={onSubmit} size="large">
          สร้าง
        </Button>
      </div>
    </div>
  )
}

export default NewContractPage
