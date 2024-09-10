import Navbar from './shared/Navbar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import useGetJobDetails from '@/hooks/useGetJobDetails'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { APPLICATION_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { setJobDetails } from '../../redux/singleJobSlice'
import { useState } from 'react'


function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options); // en-GB format gives 'dd MMM yyyy'
}

export default function JobDescription() {
  const { id } = useParams();
  const { loading } = useGetJobDetails(id);
  const { job } = useSelector(store => store.sJob)
  const { user } = useSelector(store => store.auth)
  var isApplied = job?.applications?.some(application =>
    application.applicant.toString() === user?._id.toString()
  );
  const [applied,setApplied]=useState(isApplied);
  //console.log(job?.applications , user._id);
  //const applied = false;
  // useEffect(()=>{
  //   console.log(isApplied)
  //   console.log(user?._id , " ", job?.applications[1]?.applicant)
  // },[isApplied])

const dispatch=useDispatch();
  const applyJobHandler = async () => {
    try {
      const resp =await axios.get(`${APPLICATION_END_POINT}/apply/${id}`, { withCredentials: true });
      if (resp.data.success) {
        dispatch(setJobDetails());
        console.log(resp.data.success)
        toast.success(resp.data.message);
        // isApplied=true;
        setApplied(true);
        // const updatedJob=dispatch(setJobDetails(...job,job.applications.append()))
        dispatch(setJobDetails(resp.data.newJob))
        console.log(resp.data.newJob)
      } else {
        // Show a warning toast if the response indicates failure
        toast.warning(resp.data.message || "Already applied");
        console.log("else triggered")
      }
    } catch (error) {
      console.log(error)
      toast.warning(error.response?.data?.message )
    }
  }

  if (loading) return <div className='w-full h-screen bg-purple-700 text-white flex items-center text-center transition ease-in-out delay-500'><h1 className='text-center flex m-auto'>Loading...<Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2></h1></div>;
  return (
    <div >
      <Navbar />

      <div className='max-w-7xl mx-auto my-10 border-2 border-gray-100 rounded-2xl p-10'>
        <div className=' flex  gap-5 '>
          <Button variant='ghost' className='p-1' size='xl'>
            <Avatar >
              <AvatarImage src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' >

              </AvatarImage>
            </Avatar>
          </Button>
          <div className='mx-4'>
            <h1 className='text-4xl font-semibold my-4 '>{job?.title || 'Job Title'}</h1>
            <h1 className='text-xl underline my-1 capitalize'>{job?.company?.name || 'company name'}</h1>
            <h1 className='text-lg mb-2 capitalize'>{job?.location || 'Location'}</h1>
            <div className='flex gap-2'>
              <Badge variant="ghost" className='text-blue-700 font-bold dark:bg-neutral-950 dark:text-blue-400 dark:border-2 dark:border-neutral-700'>{job?.positions + " positions" || 'no. of positions'}</Badge>
              <Badge variant="ghost" className='text-purple-700 font-bold dark:bg-neutral-950 dark:text-purple-400 dark:border-2 dark:border-neutral-700'>{job?.jobType || 'Job Type'}</Badge>
              <Badge variant="ghost" className='text-red-400 font-bold dark:bg-neutral-950 dark:text-red-400 dark:border-2 dark:border-neutral-700'>{(job?.salary * 12 / 100000).toFixed(2)} LPA</Badge>
            </div>

          </div>
          <div className='flex  items-center ml-auto'>
            {user ? (!isApplied ? <Button onClick={() => { applyJobHandler() }} className='bg-purple-600 hover:bg-purple-800 dark:text-white'>Apply Now</Button> : <Button variant='outline' disabled={true} className='cursor-not-allowed'>Already applied</Button>) : <Button><Link to="/login">Login</Link></Button>}
          </div>
        </div>
        <hr className='mt-8' />
        {job && <div >
          <h1>Job details:</h1>
          <h1 className='font-bold my-1 text-pretty'>Role : <span className='pl-4 font-medium text-gray-700 dark:text-white/80'>{job?.title}</span></h1>
          <h1 className='font-bold my-1 text-pretty'>Location : <span className='pl-4 font-medium text-gray-700 dark:text-white/80'>{job?.location}</span></h1>
          <h1 className='font-bold my-1 text-pretty'>Experience : <span className='pl-4 font-medium text-gray-700 dark:text-white/80'>{job?.experienceLevel} Years</span></h1>
          <h1 className='font-bold my-1 text-pretty'>Salary: <span className='pl-4 font-medium text-gray-700 dark:text-white/80'>{(job?.salary * 12 / 100000).toFixed(2)} LPA </span></h1>
          <h1 className='font-bold my-1 text-pretty'>Total Applicants : <span className='pl-4 font-medium text-gray-700 dark:text-white/80'>{job?.applications?.length}</span></h1>
          <h1 className='font-bold my-1 text-pretty'>Posted On: <span className='pl-4 font-medium text-gray-700 dark:text-white/80'>{formatDate(job?.updatedAt)}</span></h1>
        </div>}
        <hr className='mt-8' />
        <p className='text-justify leading-8'>
          <span className='font-bold'>      About Us:</span><br />
          {job?.company?.description}
          <br />
          <span className='font-bold'>Job Description:</span><br />

          {job?.description}
          <br />
          <span className='font-bold'>Skills:</span><br />
          {job?.requirements.map((item, ind) => (
            <Badge key={ind} className='m-2 font-medium text-lg hover:scale-110 '>{item}</Badge>
          ))}
        </p>
      </div>
    </div>
  )
}
