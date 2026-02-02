import './App.css'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { createBrowserRouter, RouterProvider,Navigate } from 'react-router-dom'

const DefaultRoute = ()=>{
  const authData = JSON.parse(localStorage.getItem('authData'));
  if(authData){
    return <Navigate to="/Login" replace/>
  }
  return <Navigate to ="/Register" replace/>
}

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <DefaultRoute/>
    },
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
