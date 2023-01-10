import type { AppProps } from 'next/app'

import '@styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Dialog } from '@core/components/Modals'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Dialog />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
