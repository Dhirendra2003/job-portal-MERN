import LatestJobCard from "./LatestJobCard"
import { useSelector } from "react-redux"

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
            <LatestJobCard key={ind} job={item}></LatestJobCard>
          )
        }):<span className="text-4xl">No jobs are present at current time 😔 </span>
      }
</div>
    </div>
  )
}
