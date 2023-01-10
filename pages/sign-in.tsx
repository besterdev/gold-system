import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import cookies from 'js-cookie'

import { signIn } from 'core/service/user'

import Image from 'next/image'
import { TextInput, Button } from '@core/components'
import Router from 'next/router'
import { useLocalStorage } from '@core/hooks/useLocalStorage'

const SignIn = () => {
  const [user, setUser] = useState({ email: '', password: '' })

  const useSignIn = useMutation(() => signIn(user), {
    onSuccess: async (data) => {
      cookies.set('access_token', data.accessToken)
      cookies.set('refresh_token', data.refreshToken)
      Router.push('/')
    }
  })

  return (
    <div className="flex w-screen h-screen">
      <div className="grid w-full h-full place-content-center bg-grey-200 ">
        <h2 className="text-center heading2">Hi, Welcome back</h2>
        <div className="mt-10">
          <Image src="/image/sign-in/illustration_dashboard.png" alt="me" width="720" height="540" />
        </div>
      </div>
      <div className="h-full w-[480px] min-w-[480px]">
        <div className="w-full px-16 pt-72">
          <p className="heading4">Sign in to Gold System</p>
          <TextInput
            id="email"
            label="Email address"
            className="mt-10"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextInput
            id="password"
            label="Password"
            className="mt-6"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <p className="mt-6 text-right underline body2">Forgot password?</p>
          <Button color="primary" className="w-full h-12 mt-6" onClick={() => useSignIn.mutate()} size="large">
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignIn
