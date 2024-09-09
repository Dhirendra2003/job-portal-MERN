import Navbar from './shared/Navbar'
import Job from './Job'
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

export default function Browse() {
  useGetAllJobs();
  const [searchParams] = useSearchParams(); // Use useSearchParams hook
  const searchstring = searchParams.get('searchstring');
  //console.log(searchstring)
  const { allJobs } = useSelector(store => store.job);
const [jobList,setJobList]=useState(allJobs);
  useEffect(() => {
    if (!searchstring) {
      setJobList(allJobs); // If no filter text, show all data
    } else {
      const filtered = allJobs.filter(job =>
        job?.title?.toLowerCase().includes(searchstring.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchstring.toLowerCase()) ||
        job?.location?.toLowerCase().includes(searchstring.toLowerCase())

      );
      setJobList(filtered);
    }
  }, [searchstring])
  return (
    <div >
      <Navbar />
      <div className='mx-auto max-w-7xl items-center my-10'>
       {searchstring && <h1 className='font-bold text-xl m-4'>Search Results ({allJobs?.length}) for {searchstring}</h1>}
        <div className='grid grid-cols-3 max-w-7xl gap-4'>
          {jobList.length>0?
            jobList.map((item, index) => {
              return (
                <Job data={item} key={index} > </Job>
              )
            }):
            <h1 className='text-center text-2xl font-bold my-10 '>No Jobs found !</h1>

          }
        </div>
      </div>
    </div>
  )
}
