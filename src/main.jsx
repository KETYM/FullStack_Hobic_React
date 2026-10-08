import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; // 1. Importamos el CSS para los colores, botones y grillas
import 'bootstrap/dist/js/bootstrap.bundle.min.js';// 2. Importamos el JS para que funcione el menú hamburguesa en celulares
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
