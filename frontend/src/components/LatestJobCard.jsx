import React from 'react'
import { Badge } from './ui/badge'


function LatestJobCard({job}) {
  return (
    <div className=' p-5 rounded-lg shadow-lg bg-white border-2 border-gray-100 '>
      <div>
    {/* <h1 className='font-medium text-lg'>{jobId}</h1> */}
    <h1 className='font-medium text-lg'>{job.company.name}</h1>
    <p className='text-sm text-gray-500' > {job.location}</p>
    </div>
    <div>
       
      <h1 className='font-bold text-xl my-2'> {job.title}</h1>
      <p className='text-sm text-gray-500' >{job.description}</p>
    </div>
    <div className='flex flex-wrap items-center gap-2 mt-4'>
      <Badge variant="ghost" className='text-blue-700 font-bold text-nowrap'>{job.positions} Positions</Badge>
      <Badge variant="ghost" className='text-purple-700 font-bold text-nowrap'>{job.jobType}</Badge>
      <Badge variant="ghost" className='text-red-400 font-bold text-nowrap'>{job.salary*12/100000} LPA</Badge>
    </div>

    </div>
  )
}

export default LatestJobCard
