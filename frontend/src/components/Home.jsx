import HeroSection from "./HeroSection"
import Navbar from "./shared/Navbar"
import CategoryCarousel from "./CategoryCarousel"
import LatestJobs from './LatestJobs'


export default function Home() {
  return (
    <div>
       <Navbar/>
        <HeroSection/>
       <CategoryCarousel/>
      <LatestJobs/>
   
    </div>
  )
}
