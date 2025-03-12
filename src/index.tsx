import './index.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { queryClient } from './lib/query'
import Providers from './lib/state/providers'
import Layout from './lib/layout'
import { SoundProvider } from './lib/sound'

const rootEl = document.getElementById('root')
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl)
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <SoundProvider>
            <Providers>
              <App />
            </Providers>
          </SoundProvider>
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>,
  )
}
