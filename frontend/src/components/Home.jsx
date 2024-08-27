import HeroSection from "./HeroSection"
import Navbar from "./shared/Navbar"
import CategoryCarousel from "./CategoryCarousel"
import LatestJobs from './LatestJobs'
import useGetAllJobs from "@/hooks/useGetAllJobs"


export default function Home() {
  useGetAllJobs();
  return (
    <div>
       <Navbar/>
        <HeroSection/>
       <CategoryCarousel/>
      <LatestJobs/>
   
    </div>
  )
}
