import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

function extractNumbers(str) {
  return str.match(/\d+/g).map(Number);  // Extract all digit sequences and convert to numbers
}
export default function Jobs() {
  useGetAllJobs();  // Fetch all jobs
const {user}=useSelector(store => store.auth)
  const { allJobs } = useSelector(store => store.job);
  const { filterJobs } = useSelector(store => store.job);

  const [jobArray, setJobArray] = useState([]);

  // Update jobArray when allJobs is fetched
  useEffect(() => {
    if (allJobs.length > 0) {
      setJobArray(allJobs);
    }
    if(!user){
      toast.warning('Login First to use This Application')
    }
  }, [allJobs]);

  useEffect(() => {
    if (!filterJobs) {
      setJobArray(allJobs);
      return;
    }

    let filteredData = allJobs;

    // Apply location filter
    if (filterJobs.location) {
      filteredData = filteredData.filter(job =>
        job?.location?.toLowerCase().includes(filterJobs.location.toLowerCase())
      );
    }

    // Apply industry filter
    if (filterJobs.industry) {
      filteredData = filteredData.filter(job =>
        job?.description?.toLowerCase().includes(filterJobs.industry.toLowerCase()) ||
        job?.title?.toLowerCase().includes(filterJobs.industry.toLowerCase())
      );
    }

    // Apply salary filter (if it's implemented in the data)
    if (filterJobs.salary) {
      let salRange = filterJobs.salary.slice(0, -3);  // Remove the "LPA" part
      salRange = extractNumbers(salRange);  // Extract numbers (e.g., [0, 2] for "0 - 2 LPA")

      // Assuming that job.salary is in numbers and in LPA
      filteredData = filteredData.filter(job => {
        const jobSalary = job?.salary* 12 / 100000;  // Assuming job.salary is a number like 5 (for 5 LPA)

        // Check if job's salary is within the extracted range
        if (salRange.length === 1) {
          // For "50+ LPA", we only have the lower bound
          return jobSalary >= salRange[0];
        } else if (salRange.length === 2) {
          // For ranges like "0 - 2 LPA", we check if the salary is within the range
          return jobSalary >= salRange[0] && jobSalary <= salRange[1];
        }
        return true;  // Return true for any other cases (e.g., if no salary is provided)
      })
    }

    setJobArray(filteredData);
  }, [filterJobs, allJobs]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%] sticky top-0">
            <FilterCard />
          </div>

          {jobArray.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 min-h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {jobArray.map((job, index) => (
                  <motion.div initial={{opacity:0,x:100}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-100}} transition={{duration:.5}} key={index}>
                    <Job key={index} data={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
