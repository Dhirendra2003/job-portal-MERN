import React from 'react'
import { Badge } from './ui/badge'
import { Ghost } from 'lucide-react'

function LatestJobCard() {
  return (
    <div className=' p-5 rounded-lg shadow-lg bg-white border-2 border-gray-100 '>
      <div>
    <h1 className='font-medium text-lg'>Company Name</h1>
    <p className='text-sm text-gray-500' > India</p>
    </div>
    <div>
       
      <h1 className='font-bold text-xl my-2'> Job Title</h1>
      <p className='text-sm text-gray-500' >Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
    </div>
    <div className='flex items-center gap-2 mt-4'>
      <Badge variant={Ghost} className='text-blue-700 font-bold'>12 Positions</Badge>
      <Badge variant={Ghost} className='text-purple-700 font-bold'>part-time</Badge>
      <Badge variant={Ghost} className='text-red-400 font-bold'>3.6 lpa</Badge>
    </div>

    </div>
  )
}

export default LatestJobCard
