import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function RouteProtector({children}) {
  const {user}=useSelector(store=>store.auth)
  const navigate=useNavigate();
  useEffect(()=>{
    if(user===null || user.role==='student'){
      navigate('/')
    }
  },[])
  return (
    <>{children}</>
  )
}
