import Navbar from './shared/Navbar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar,AvatarImage } from './ui/avatar'
import useGetJobDetails from '@/hooks/useGetJobDetails'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

function formatDate(dateString) {
  const date = new Date(dateString); 
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options); // en-GB format gives 'dd MMM yyyy'
}

export default function JobDescription() {
 
  const { id } = useParams();
  const { jobData, loading } = useGetJobDetails(id);
  const { user } = useSelector(store => store.auth)
  //const applied = false;

  if (loading) return <div className='w-full h-screen bg-purple-700 text-white flex items-center text-center transition ease-in-out delay-500'><h1 className='text-center flex m-auto'>Loading...<Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2></h1></div>;
  return (
    <div >
      <Navbar/>
      
      <div className='max-w-7xl mx-auto my-10 border-2 border-gray-100 rounded-2xl p-10'>
        <div className=' flex  gap-5 '>
      <Button variant='ghost' className='p-1' size='xl'>
          <Avatar >
            <AvatarImage src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' >

            </AvatarImage>
          </Avatar>
        </Button>
        <div className='mx-4'>
        <h1 className='text-4xl font-semibold my-4 '>{jobData?.job?.title || 'Job Title'}</h1>
        <h1 className='text-xl underline my-1 capitalize'>{jobData?.job?.company?.name || 'company name'}</h1>
        <h1 className='text-lg mb-2 capitalize'>{jobData?.job?.location || 'Location'}</h1>
      <div className='flex gap-2'>
      <Badge variant="ghost" className='text-blue-700 font-bold'>{jobData?.job?.positions+" positions" || 'no. of positions'}</Badge>
      <Badge variant="ghost" className='text-purple-700 font-bold'>{jobData?.job?.jobType || 'Job Type'}</Badge>
      <Badge variant="ghost" className='text-red-400 font-bold'>{jobData?.job?.salary*12/100000} LPA</Badge>
      </div>

      </div>
      <div className='flex  items-center ml-auto'>
     {user ?(jobData.job.applications[0]==user._id?   <Button className='bg-purple-600 hover:bg-purple-800'>Apply Now</Button>:<Button variant='outline' disabled={true} className='cursor-not-allowed'>Already applied</Button>):<Button><Link to="/login">Login</Link></Button>}
      </div>
      </div>
      <hr className='mt-8'/>
     {jobData && <div >
        <h1>Job details:</h1>
        <h1 className='font-bold my-1 text-pretty'>Role : <span className='pl-4 font-medium text-gray-700'>{jobData?.job?.title}</span></h1>
        <h1 className='font-bold my-1 text-pretty'>Location : <span className='pl-4 font-medium text-gray-700'>{jobData?.job?.location}</span></h1>
        <h1 className='font-bold my-1 text-pretty'>Experience : <span className='pl-4 font-medium text-gray-700'>{jobData?.job?.experienceLevel} Years</span></h1>
        <h1 className='font-bold my-1 text-pretty'>Salary: <span className='pl-4 font-medium text-gray-700'>{jobData?.job?.salary*12/100000} LPA </span></h1>
        <h1 className='font-bold my-1 text-pretty'>Total Applicants : <span className='pl-4 font-medium text-gray-700'>{jobData?.job?.applications?.length}</span></h1>
        <h1 className='font-bold my-1 text-pretty'>Posted On: <span className='pl-4 font-medium text-gray-700'>{formatDate(jobData?.job?.updatedAt)}</span></h1>
      </div>}
      <hr className='mt-8'/>
      <p className='text-justify'>
<span className='font-bold'>      About Us:</span><br />
{jobData?.job?.company?.description}
<br />
<span className='font-bold'>Job Description:</span><br />

{jobData?.job?.description}
<br />
<span className='font-bold'>Skills:</span><br />
{jobData?.job?.requirements.map((item, ind) => (
              <Badge key={ind} className='m-2 font-medium text-lg hover:scale-110 '>{item}</Badge>
            ))}
      </p>
      </div>
      </div>
  )
}
