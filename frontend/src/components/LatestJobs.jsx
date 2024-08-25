import LatestJobCard from "./LatestJobCard"

const jobarray=[1,2,3,4,5,6,7,8]

export default function LatestJobs() {
  return (
    <div className="mx-auto my-20 max-w-5xl">
      <h1 className="text-4xl font-bold"><span className="text-[#6A38C2]">Latest & Top </span>Job Openings </h1>
      <div className="grid grid-cols-3 gap-4 my-5 mx-auto ">
      {
        jobarray.slice(0,6).map((item,ind)=>{
          return (
            <LatestJobCard key={ind}></LatestJobCard>
          )
        })
      }
</div>
    </div>
  )
}
