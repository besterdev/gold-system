import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { TextInput, Button, TextArea, UploadProfile } from '@core/components'

interface FormData {
  firstName: string
  lastName: string
  idCard: string
  phone: string
  area: string
  email: string
}

const schema = yup.object({
  firstName: yup.string().required('กรุณากรอกชื่อ'),
  lastName: yup.string().required('กรุณากรอกนามสกุล'),
  idCard: yup.string().required('กรุณากรอกนามสกุล'),
  phone: yup.string().required('กรุณากรอกเบอร์โทร'),
  area: yup.string().required('กรุณากรอกเบอร์โทร'),
  email: yup.string().email().required('กรุณากรอกอีเมล')
})

const NewUserPage = () => {
  const {
    formState: { errors, isDirty, isValid },
    register,
    handleSubmit
  } = useForm<FormData>({
    defaultValues: { firstName: '', lastName: '', email: '' },
    resolver: yupResolver(schema)
  })

  return (
    <div className="container grid h-screen mx-auto bg-white-200">
      <div className="flex items-start mt-10 space-x-8">
        <div className="flex flex-col items-center justify-center w-1/4 px-6 py-10 bg-white rounded-2xl shadow-card">
          <UploadProfile />
          <p className="mt-6 text-center body2 text-grey-600">
            Allowed *.jpeg, *.jpg, *.png, *.gif
            <br /> max size of 3.1 MB
          </p>
        </div>

        <div className="flex flex-col items-end w-full px-6 py-10 bg-white rounded-2xl shadow-card">
          <div className="flex w-full space-x-4">
            <div className="w-1/2">
              <TextInput id="firstName" label="ชื่อ" {...register('firstName')} error={errors.firstName} />
              {errors.firstName ? <p className="mt-2 body2 text-error-300">{errors.firstName.message}</p> : null}
            </div>
            <div className="w-1/2">
              <TextInput id="lastName" label="นามสกุล" {...register('lastName')} error={errors.lastName} />
              {errors.lastName ? <p className="mt-2 body2 text-error-300">{errors.lastName.message}</p> : null}
            </div>
          </div>
          <div className="flex w-full mt-6 space-x-4">
            <div className="w-1/2">
              <TextInput id="lastName" label="บัตรประชาชน" {...register('idCard')} error={errors.idCard} />
              {errors.idCard ? <p className="mt-2 body2 text-error-300">{errors.idCard.message}</p> : null}
            </div>
            <div className="w-1/2">
              <TextInput id="phone" label="เบอร์โทร" {...register('phone')} error={errors.phone} />
              {errors.phone ? <p className="mt-2 body2 text-error-300">{errors.phone.message}</p> : null}
            </div>
          </div>
          <TextArea id="area" label="ที่อยู่" className="w-full mt-6" {...register('area')} error={errors.area} />

          <Button color="primary" className="mt-6 w-44" onClick={() => console.log(123)} size="large">
            Create Customer
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NewUserPage
