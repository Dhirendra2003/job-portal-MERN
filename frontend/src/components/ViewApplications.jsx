import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './shared/Navbar'
import axios from 'axios'
import { APPLICATION_END_POINT } from '@/utils/constants'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import ApplicantsTable from './ApplicantsTable'

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options); // en-GB format gives 'dd MMM yyyy'
}



export default function ViewApplications() {
  const { id } = useParams()
 
  const [data,setData]=useState()
  useEffect(() => {

    const fetchAllApplications = async () => {
      try {
        const resp = await axios.get(`${APPLICATION_END_POINT}/${id}/applicants`, { withCredentials: true });
        if (resp.data.success) {
        
         setData(resp.data.job);
         console.log(resp.data.job)
        }
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchAllApplications();
  }, [])
  // useEffect(()=>{  console.log(data +"this is it")},[data])

 
  
  return (
    <div>
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
            <h1 className='text-4xl font-semibold my-4 '>{data?.title || 'Job Title'}</h1>
            <h1 className='text-xl underline my-1 capitalize'>{data?.company?.name || 'company name'}</h1>
            <h1 className='text-lg mb-2 capitalize'>{data?.location || 'Location'}</h1>
            <div className='flex gap-2'>
              <Badge variant="ghost" className='text-blue-700 font-bold dark:bg-neutral-950 dark:text-blue-400 dark:border-2 dark:border-neutral-700'>{data?.positions + " positions" || 'no. of positions'}</Badge>
              <Badge variant="ghost" className='text-purple-700 font-bold dark:bg-neutral-950 dark:text-purple-400 dark:border-2 dark:border-neutral-700'>{data?.dataType || 'Job Type'}</Badge>
              <Badge variant="ghost" className='text-red-400 font-bold dark:bg-neutral-950 dark:text-red-400 dark:border-2 dark:border-neutral-700'>{(data?.salary * 12 / 100000).toFixed(2)} LPA</Badge>
            </div>

          </div>
          <div className='flex  items-center ml-auto'>
          {data && <div className='text-justify' >
          <h1 className='font-bold text-xl'>Job details:</h1>
          <h1 className='font-bold my-1 text-pretty'>Role : <span className='pl-4 font-medium text-gray-700 dark:text-white'>{data?.title}</span></h1>
          <h1 className='font-bold my-1 text-pretty'>Location : <span className='pl-4 font-medium text-gray-700 dark:text-white'>{data?.location}</span></h1>
          <h1 className='font-bold my-1 text-pretty'>Experience : <span className='pl-4 font-medium text-gray-700 dark:text-white'>{data?.experienceLevel} Years</span></h1>
          <h1 className='font-bold my-1 text-pretty'>Salary: <span className='pl-4 font-medium text-gray-700 dark:text-white'>{(data?.salary * 12 / 100000).toFixed(2)} LPA </span></h1>
          <h1 className='font-bold my-1 text-pretty'>Total Applicants : <span className='pl-4 font-medium text-gray-700 dark:text-white'>{data?.applications?.length}</span></h1>
          <h1 className='font-bold my-1 text-pretty'>Posted On: <span className='pl-4 font-medium text-gray-700 dark:text-white'>{formatDate(data?.updatedAt)}</span></h1>
        </div>}
          </div>
        </div>
      </div>
      <div>
        <ApplicantsTable data={data}/>
      </div>
    </div>
  )
}
