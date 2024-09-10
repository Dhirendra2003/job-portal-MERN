import Navbar from './shared/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constants';
import Job from './Job';
import { motion } from 'framer-motion';

export default function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const getSavedJobs = async () => {
      const resp = await axios.get(`${USER_API_END_POINT}/profile/getsavedjobs`, { withCredentials: true, headers: { "Content-Type": 'application/json' } });
      if (resp.data?.success) {
        setJobs(resp.data?.saved)
      }
    }
    getSavedJobs();
  }, [])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <h1 className='m-4 font-bold text-2xl'>Your Saved Jobs</h1>
        <div className="flex gap-5">
          {jobs.length <= 0 ? (
            <span>No Saved Jobs Found!!</span>
          ) : (
            <div className="flex-1 min-h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {jobs.map((job, index) => (
                  <motion.div initial={{opacity:0,x:100}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-100}} transition={{duration:.5}} key={index}>
                    <Job  data={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
