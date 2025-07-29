import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import MusicApp from './MusicApp.jsx'
import MusicDashboard from './MusicDashboard.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'




createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <App/>
</BrowserRouter>
  
)

