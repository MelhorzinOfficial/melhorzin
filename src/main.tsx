import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocomotiveScrollProvider options={{ smooth: true, multiplier: 1, }}>
      <App />
    </LocomotiveScrollProvider>
  </StrictMode>
);
