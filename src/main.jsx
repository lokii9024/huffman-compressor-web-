import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import Home from './pages/Home.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import GetStarted from './pages/GetStarted.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element:<Home/>
      },
      {
        path: "/how-it-works",
        element:<HowItWorks/>
      },
      {
        path: "get-started",
        element: <GetStarted/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <RouterProvider router={router} />
    <CssBaseline />  
  </StrictMode>
)
