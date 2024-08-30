import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { BriefcaseBusiness, Building2, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import AdminJobsTable from './AdminJobsTable';

export default function AdminJobs() {
  const [filter,setFilter]=useState();
  return (
    <div> 
      <Navbar/>
     <div className=' grid max-w-6xl m-auto'>
      <div className='flex min-w-[100%]  justify-between mx-auto my-10'>
          <div className='flex  items-center gap-2'>
            <Search />
            <Input onChange={(e)=>{setFilter(e.target.value);}} className=' w-50 ' placeholder='Search ...'>
            </Input>
          </div>
          <div className='flex  items-center gap-2'>

            <Link to={'/admin/job/post'}><Button className='flex gap-2 items-center w-50'>   <BriefcaseBusiness /><span> New Job </span></Button></Link>
          </div>
        </div>
        <AdminJobsTable filter={filter}  setFilter={setFilter}/>
     </div>
    </div>
  )
}
