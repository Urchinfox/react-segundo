import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import axios from 'axios'
// import './index.css'
import App from './App.jsx'
axios.defaults.baseURL=import.meta.env.VITE_APP_API_URL;



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
