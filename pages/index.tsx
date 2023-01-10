import Head from 'next/head'

import { Button, Select, TextArea, TextInput } from '@core/components'

import AuthMiddleware from 'core/middleware/AuthMiddleware'
import { useUserStore } from 'core/store/user'

export default function Home() {
  const user = useUserStore((state: any) => state.user)

  return (
    <AuthMiddleware>
      <>
        <Head>
          <title>Gold System App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="grid h-screen bg-white-200 place-content-center">
          <h1 className="mb-10 font-bold heading1">Gold System 101 {user?.email}</h1>

          <TextInput label="Email address" id="email" className="mb-4" />
          <TextArea label="Multiline" id="Multiline" className="mb-4" />

          <Select
            id="selector"
            label="Selector"
            options={[
              { name: '🇹🇭', value: 'thai' },
              { name: '🇨🇱', value: 'chile' },
              { name: '🇨🇦', value: 'canada' },
              { name: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', value: 'england' }
            ]}
            value="thailand"
            onSelect={() => console.log(123)}
          />
          <Button color="secondary" className="mt-10" onClick={() => console.log(123)} size="large">
            Submit
          </Button>

          <h1 className="flex mt-10 font-semibold text-center text-purple-600">
            Hello <span className="animate-waving-hand">👋🏻</span>, LogRocket Blog
          </h1>
        </main>
      </>
    </AuthMiddleware>
  )
}
