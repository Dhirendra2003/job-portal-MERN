import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"
import Footer from "./components/Footer"

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
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/jobs/description/:id',
    element:<JobDescription/>
  },
])
function App() {
  

  return (
    <>
  
  <RouterProvider router={appRouter}/>
  <Footer/>
    </>
  )
}

export default App
