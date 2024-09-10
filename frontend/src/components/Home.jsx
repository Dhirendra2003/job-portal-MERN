import HeroSection from "./HeroSection"
import Navbar from "./shared/Navbar"
import CategoryCarousel from "./CategoryCarousel"
import LatestJobs from './LatestJobs'
import useGetAllJobs from "@/hooks/useGetAllJobs"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


export default function Home() {
  useGetAllJobs();
  const {user}=useSelector(store=>store.auth);
  const nav=useNavigate();
  useEffect(()=>{
    if(user?.role==="recruiter"){
nav('/admin/companies');
    }
    if(!user){
      toast.warning('Login First to use This Application')
    }
  })
  return (
    <div>
       <Navbar/>
        <HeroSection/>
       <CategoryCarousel/>
      <LatestJobs/>
   
    </div>
  )
}
