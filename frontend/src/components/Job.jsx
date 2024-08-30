/* eslint-disable react/prop-types */

import { Button } from './ui/button'
import { Bookmark, Building2 } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function timeAgo(createdAt) {
  const now = new Date(); // Current date and time
  const createdDate = new Date(createdAt); // Created date and time
  const diffInSeconds = Math.floor((now - createdDate) / 1000); // Difference in seconds

  // Calculate time difference in various units
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  // Determine the appropriate time difference string
  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (weeks > 0) {
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return "Just now";
  }
}

function Job({data}) {
  const nav=useNavigate()
  //const jobId=0
  return (
    <div className=' p-5 pb-2 rounded-lg shadow-lg bg-white border-2 border-gray-100 '>
      <div className='flex items-center justify-between'>
        <p>{timeAgo(data.createdAt)}</p>
        <Button variant='outline' className='rounded-full' size='icon'> <Bookmark /></Button>
      </div>
      <div className='cursor-pointer'>
      <div className='flex items-center gap-4 my-2'>
        <Button variant='outline' className='p-1' size='icon'>
          {data?.company?.logo?<Avatar >
            <AvatarImage src={data.company.logo } >

            </AvatarImage>
          </Avatar>:
          <Building2/>}
        </Button>
        <div>
          <h1 className='font-semibold text-lg'>{data.company.name}</h1>
          <p>{data.location}</p>
        </div>
      </div>
      <div >
        <h1 className='font-bold text-xl capitalize text-nowrap overflow-clip'>{data.title}</h1>
        <p className='text-sm text-gray-600 my-4'>{data.description}</p>
      </div>
      </div>
      <div className='flex gap-2 flex-wrap'>
      <Badge variant="ghost" className='text-blue-700 font-bold'>{data.positions} Positions</Badge>
      <Badge variant="ghost" className='text-purple-700 font-bold'>{data.jobType}</Badge>
      <Badge variant="ghost" className='text-red-400 font-bold'>{data.salary*12/100000} LPA</Badge>
      </div>
      <div className=' flex gap-4 flex-wrap my-4'>
        <Button className='bg-purple-700 hover:bg-purple-900' onClick={()=>{nav(`/jobs/description/${data._id}`)}}>Details</Button>
        <Button variant='outline' >Save for later</Button>
      </div>
    </div>
  )
}

export default Job