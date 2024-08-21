import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"

const  appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  // {
  //   path:'/',
  //   element:<Home/>
  // },
  // {
  //   path:'/',
  //   element:<Home/>
  // },
])
function App() {
  

  return (
    <>
  
  <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
