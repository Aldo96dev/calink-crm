import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './index.css'   // 👈 aquí cargamos Tailwind
import { AuthProvider } from "./auth/AuthProvider.jsx";

//import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'

import Router from './app/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HashRouter>
        <Router />
      </HashRouter>

    </AuthProvider>

  </StrictMode>,
)


// <App /> import { AuthProvider } from './auth/AuthProvider.jsx'