import { Link } from "react-router-dom"
import LatestJobCard from "./LatestJobCard"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"

//const jobarray=[1,2,3,4,5,6,7,8]

export default function LatestJobs() {
  const { allJobs} = useSelector(store => store.job)
  return (
    <div className="mx-auto my-20 max-w-5xl">
      <h1 className="text-4xl font-bold"><span className="text-[#6A38C2]">Latest & Top </span>Job Openings </h1>
      <div className="grid grid-cols-3 gap-4 my-5 mx-auto ">
      {
       allJobs ? allJobs.slice(0,6).map((item,ind)=>{
          return (
            <motion.div initial={{opacity:0,x:100}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-100}} transition={{duration:.5}} key={ind}>
            <Link to={`/jobs/description/${item._id}`}>
            <LatestJobCard  job={item}></LatestJobCard>
            </Link>
            </motion.div>
          )
        }):<span className="text-4xl">No jobs are present at current time 😔 </span>
      }
</div>
    </div>
  )
}
