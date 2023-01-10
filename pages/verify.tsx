import Router from 'next/router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'

import { verify } from 'core/service/user'

import { Button, ImageFallback, VerifyInput } from '@core/components'
import { useDialogStore } from 'core/store/dialog'

interface FormData {
  otp: string[]
}

const Verify = () => {
  const { onConfirm, toggleDialog } = useDialogStore()

  const schema = yup
    .object({
      otp: yup.array(yup.string().required())
    })
    .required()

  const {
    formState: { isDirty, isValid },
    watch,
    setValue,
    handleSubmit
  } = useForm<FormData>({
    defaultValues: { otp: new Array(6).fill('') },
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit(async (data: FormData) => {
    const newOTP = data.otp.toString().replace(/,/g, '')
    const id = Router.query.id

    useVerify.mutate({ data: { otp: newOTP, userId: id } })
  })

  const useVerify = useMutation(({ data }: any) => verify(data), {
    onSuccess: async () => {
      await useDialogStore.setState({
        image: '/image/verify/undraw_dreamer.svg',
        content: 'verify account success!',
        onConfirm: () => Router.push('/sign-in')
      })
      toggleDialog()
    },
    onError: async (error: any) => {
      if (error.response.status === 401) {
        await useDialogStore.setState({
          image: '/image/verify/cancel.svg',
          content: 'invalid otp code passed. check your email',
          onConfirm: () => console.log('error')
        })
        toggleDialog()
      }
    }
  })

  return (
    <main className="grid h-screen bg-white-200 place-content-center">
      <div className="flex items-center justify-center mt-10">
        <ImageFallback src="/image/verify/email.svg" alt={'email'} className="w-24 h-24" />
      </div>
      <h1 className="my-10 font-bold text-center heading2">Please check your email!</h1>
      <VerifyInput otp={watch('otp')} setOTO={(otp: string[]) => setValue('otp', otp, { shouldValidate: true, shouldDirty: true })} />
      <Button color="primary" className="w-full h-12 mt-10" onClick={() => onSubmit()} size="large" disabled={!isDirty || !isValid}>
        Verify Account
      </Button>

      <p className="mt-6 text-center body1 ">
        Don’t have a code? <span className="button1 text-primary-300 hover:underline">Resend code</span>
      </p>
      <a className="mt-6 text-center body1 hover:underline">Return to sign in</a>
    </main>
  )
}

export default Verify
