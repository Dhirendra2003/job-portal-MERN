import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux"
import useGetAllJobs from "@/hooks/useGetAllJobs";
// const jobArray = [1, 2, 3, 4, 5, 6, 7, 98]
export default function Jobs() {
  useGetAllJobs();
  const { allJobs} = useSelector(store => store.job)
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 ">
        <div className="flex gap-5 ">
          <div className="w-[20%] sticky top-0 ">
            <FilterCard />
          </div>

          {
            allJobs.length <= 0 ? <span>Job not found</span> :
              <div className="flex-1 min-h-[88vh] overflow-y-auto pb-5 ">
                <div className="grid grid-cols-3 gap-4">
                  {allJobs.map((arr, index) => {
                    return (
                      <div key={index}>
                        <Job key={index} data={arr}/>
                      </div>
                    )
                  })}
                </div>
              </div>}
        </div>
      </div>
    </div>
  )
}
