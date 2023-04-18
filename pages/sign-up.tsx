import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { signUpUser } from 'core/service/user'

import Image from 'next/image'
import { TextInput, Button } from '@core/components'

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

const SignUp = () => {
  const schema = yup
    .object({
      firstName: yup.string().required('กรุณากรอกชื่อ'),
      lastName: yup.string().required('กรุณากรอกนามสกุล'),
      email: yup.string().email().required('กรุณากรอกอีเมล'),
      password: yup.string().required('กรุณากรอกรหัสผ่าน')
    })
    .required()

  const {
    formState: { errors, isDirty, isValid },
    register,
    handleSubmit
  } = useForm<FormData>({
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data) => {
    useSignUp.mutate({ data: data })
  })

  const useSignUp = useMutation(({ data }: any) => signUpUser(data), {
    onSuccess: (data) => {
      console.log(data)
    }
  })

  return (
    <div className="flex h-screen w-screen">
      <div className="grid h-full w-full place-content-center bg-grey-200 ">
        <h2 className="heading2 text-center">Hi, Welcome back</h2>
        <div className="mt-10">
          <Image src="/image/sign-in/illustration_dashboard.png" alt="me" width="720" height="540" />
        </div>
      </div>
      <div className="h-full w-[480px] min-w-[480px]">
        <div className="w-full px-16 pt-72">
          <p className="heading4">Sign up to Gold System</p>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <TextInput id="firstName" label="firstName" className="mt-10" {...register('firstName')} error={errors.firstName} />
              {errors.firstName ? <p className="body2 mt-2 text-error-300">{errors.firstName.message}</p> : null}
            </div>
            <div className="w-1/2">
              <TextInput id="lastName" label="lastName" className="mt-10" {...register('lastName')} error={errors.lastName} />
              {errors.lastName ? <p className="body2 mt-2 text-error-300">{errors.lastName.message}</p> : null}
            </div>
          </div>
          <TextInput id="email" label="email" className="mt-6" {...register('email')} error={errors.email?.message} />
          {errors.email ? <p className="body2 mt-2 text-error-300">{errors.email.message}</p> : null}
          <TextInput id="password" label="password" className="mt-6" {...register('password')} error={errors.password} />
          {errors.password ? <p className="body2 mt-2 text-error-300">{errors.password.message}</p> : null}
          <Button color="primary" className="mt-10 h-12 w-full" onClick={() => onSubmit()} size="large" disabled={!isDirty || !isValid}>
            Create Account
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
