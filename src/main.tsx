import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './main.css'
import App from './App'
import { useAuthStore } from '@/store/auth.store'

function ThemeSync({ children }: { children: React.ReactNode }) {
  const theme = useAuthStore(state => state.theme)

  React.useEffect(() => {
    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return children
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeSync>
        <App />
      </ThemeSync>
    </BrowserRouter>
  </React.StrictMode>
)
