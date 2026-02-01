import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/header'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


function App() {
  const route = createBrowserRouter([
    {
      path: "/Login",
      element: <Login/>
    },
    {
      path:"/Register",
      element:<Register/>
    }

  ])

  return <RouterProvider router={route}/>
}

export default App
