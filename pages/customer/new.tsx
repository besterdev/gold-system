import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Dayjs } from 'dayjs'
import _ from 'lodash'

import { createCustomer } from 'core/service/customer'

import { TextInput, Button, TextArea, UploadProfile, DatePicker } from '@core/components'

interface FormData {
  firstName: string
  lastName: string
  idCard: string
  phone: string
  address: string
  birthday: Date | Dayjs | null
  email: string
  image?: File | null
}

const schema = yup.object({
  firstName: yup.string().required('กรุณากรอกชื่อ')
  // lastName: yup.string().required('กรุณากรอกนามสกุล'),
  // idCard: yup.string().required('กรุณากรอกนามสกุล'),
  // phone: yup.string().required('กรุณากรอกเบอร์โทร'),
  // address: yup.string().required('กรุณากรอกที่อยู่'),
  // email: yup.string().email().required('กรุณากรอกอีเมล')
})

const initValueNewUser = { firstName: '', lastName: '', idCard: '', phone: '', address: '', email: '', birthday: null, image: null }

const NewUserPage = () => {
  const {
    formState: { errors, isDirty, isValid },
    register,
    watch,
    setValue,
    handleSubmit
  } = useForm<FormData>({
    defaultValues: initValueNewUser,
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data) => {
    let formData: any = _.cloneDeep(data)

    const image: File | null | undefined = data.image
    console.log(formData)
    if (image) {
      delete formData.image
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onloadend = async () => {
        formData.image = await reader.result
        useSubmitForm.mutate(formData)
      }
    }
  })

  const useSubmitForm = useMutation((data: any) => createCustomer(data), {
    onSuccess: (data) => {
      console.log(data)
    }
  })

  return (
    <div className="bg-white-200 container mx-auto grid h-screen">
      <div className="mt-10 flex items-start space-x-8">
        <div className="flex w-1/4 flex-col items-center justify-center rounded-2xl bg-white px-6 py-10 shadow-card">
          <UploadProfile onChange={(file) => setValue('image', file)} />
          <p className="body2 mt-6 text-center text-grey-600">
            Allowed *.jpeg, *.jpg, *.png, *.gif
            <br /> max size of 3.1 MB
          </p>
        </div>

        <div className="grid w-full grid-cols-2 items-end gap-6 rounded-2xl bg-white px-6 py-10 shadow-card">
          <>
            <TextInput id="firstName" label="ชื่อ" {...register('firstName')} error={errors.firstName} />
            {errors.firstName ? <p className="body2 mt-2 text-error-300">{errors.firstName.message}</p> : null}
          </>
          <>
            <TextInput id="lastName" label="นามสกุล" {...register('lastName')} error={errors.lastName} />
            {errors.lastName ? <p className="body2 mt-2 text-error-300">{errors.lastName.message}</p> : null}
          </>
          <>
            <TextInput id="lastName" label="บัตรประชาชน" {...register('idCard')} error={errors.idCard} />
            {errors.idCard ? <p className="body2 mt-2 text-error-300">{errors.idCard.message}</p> : null}
          </>
          <>
            <TextInput id="phone" label="เบอร์โทร" {...register('phone')} error={errors.phone} />
            {errors.phone ? <p className="body2 mt-2 text-error-300">{errors.phone.message}</p> : null}
          </>
          <>
            <DatePicker id="start" label="วันเกิดตามบัตรประชาชน" value={watch('birthday')} onChange={(date) => setValue('birthday', date)} />
          </>
          <TextArea
            id="address"
            label="ที่อยู่"
            className="col-span-2 w-full"
            // {...register('address')}
            error={errors.address}
            value={watch('address')}
            onChange={(e) => setValue('address', e.target.value)}
          />
          <Button color="primary" className="mt-6 w-44" onClick={onSubmit} size="large">
            เพิ่มข้อมูลลูกค้า
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NewUserPage
