import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContext from './context/authContext.jsx'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <HelmetProvider>
      <AuthContext>
       <App />
    </AuthContext>
    </HelmetProvider>
  </StrictMode>,
)
