import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import Router from 'next/router'
import Cookies from 'js-cookie'

import { useUserStore } from 'core/store/user'

import { getMe } from 'core/service/user'
import { useDialogStore } from 'core/store/dialog'

type AuthMiddlewareProps = {
  children: React.ReactElement
}

const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const setUser = useUserStore((state: any) => state.setUser)
  const { toggleDialog } = useDialogStore()

  const { isLoading } = useQuery(['me'], async () => await getMe(Cookies.get('access_token')), {
    onSuccess: (data) => {
      setUser(data)
    },
    onError: async (error: any) => {
      if (error.response?.status === 401) {
        await useDialogStore.setState({
          image: '/image/verify/cancel.svg',
          content: 'invalid otp code passed. check your email',
          onConfirm: () => Router.push('/sign-in')
        })
        toggleDialog()
      } else {
        useDialogStore.setState({
          image: '/image/verify/cancel.svg',
          content: 'was wrong error!',
          onConfirm: () => Router.push('/sign-in')
        })
        toggleDialog()
      }
    }
  })

  if (isLoading) {
    return <div className="grid h-screen bg-white-200 place-content-center">Loading...</div>
  }

  return children
}

export default AuthMiddleware
