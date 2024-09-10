/* eslint-disable react/prop-types */
import { Button } from './ui/button';
import { Bookmark, BookmarkCheck, Building2 } from 'lucide-react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constants';
import { toast } from 'sonner';
import { setUser } from '../../redux/authSlice';

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

function Job({ data }) {
  const [jobSaved, setJobSaved] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.saved?.length > 0) {
      // Ensure the comparison is between string values
      // const isJobSaved = user.saved.some((savedJob) => savedJob._id === data._id.toString());
      for (let i = 0; i < user.saved.length; i++) {
        if (user.saved[i] === data._id) {
          setJobSaved(true)
        }
      }
      // setJobSaved(isJobSaved);
    }
  }, [user, data._id]);
  const dispatch = useDispatch();

  const sendSaved = async () => {
    try {
      const resp = await axios.post(`${USER_API_END_POINT}/profile/savejob`, { job: data._id }, { withCredentials: true, headers: { "Content-Type": 'application/json' } })
      if (resp.data.success) {
        toast.success(resp.data.message);
        dispatch(setUser(resp.data.user));
      }
      else {
        toast.warning(resp.data.message || "Job Save failed. Please try again.");
        console.log("else triggered")
      }
    }
    catch (error) {
      console.log(error)
      toast.warning(error.response?.data?.message || "An error occurred. Please try again.");
    }
  }


  return (
    <div className='p-5 pb-2 rounded-lg shadow-lg bg-white border-2 border-gray-100 dark:bg-neutral-900 dark:border-gray-600'>
      <div className='flex items-center justify-between'>
        <p>{timeAgo(data.createdAt)}</p>
        <Button variant='outline' className='rounded-full ' size='icon'>
          {jobSaved ? <BookmarkCheck className='text-red-500' /> : <Bookmark />}
        </Button>
      </div>
      <div className='cursor-pointer'>
        <div className='flex items-center gap-4 my-2'>
          <Button variant='outline' className='p-1 dark:bg-white' size='icon'>
            {data?.company?.logo ? (
              <Avatar>
                <AvatarImage src={data.company.logo} />
              </Avatar>
            ) : (
              <Building2 />
            )}
          </Button>
          <div>
            <h1 className='font-semibold text-lg'>{data.company.name}</h1>
            <p>{data.location}</p>
          </div>
        </div>
        <div>
          <h1 className='font-bold text-xl capitalize text-nowrap overflow-clip'>{data.title}</h1>
          <p className='text-sm text-gray-600 my-4 dark:text-neutral-400'>{data.description}</p>
        </div>
      </div>
      <div className='flex gap-2 flex-wrap'>
        <Badge variant="ghost" className='text-blue-700 font-bold dark:bg-neutral-950 dark:text-blue-400 dark:border-2 dark:border-neutral-700'>
          {data.positions} Positions
        </Badge>
        <Badge variant="ghost" className='text-purple-700 font-bold dark:bg-neutral-950 dark:text-purple-400 dark:border-2 dark:border-neutral-700'>
          {data.jobType}
        </Badge>
        <Badge variant="ghost" className='text-red-400 font-bold dark:bg-neutral-950 dark:text-red-400 dark:border-2 dark:border-neutral-700'>
          {data.salary * 12 / 100000} LPA
        </Badge>
      </div>
      <div className='flex gap-4 flex-wrap my-4'>
        <Button
          className='bg-purple-700 hover:bg-purple-900 dark:text-white'
          onClick={() => {
            navigate(`/jobs/description/${data._id}`);
          }}
        >
          Details
        </Button>
        {!jobSaved ? <Button variant='outline' className='dark:bg-neutral-600' onClick={()=>{sendSaved()}}>Save for later</Button> :
          <Button className='cursor-not-allowed opacity-50 bg-gray-50 text-gray-500 dark:bg-neutral-800 ' variant='ghost'>Saved</Button>}
      </div>
    </div>
  );
}

export default Job;
