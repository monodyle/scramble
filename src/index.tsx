import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import Providers from './lib/state/providers'

const rootEl = document.getElementById('root')
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl)
  root.render(
    <React.StrictMode>
      <Providers>
        <App />
      </Providers>
    </React.StrictMode>,
  )
}
