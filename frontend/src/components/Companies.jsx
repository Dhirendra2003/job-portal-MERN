import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Input } from './ui/input'
import { Building2, Search } from 'lucide-react'
import { Button } from './ui/button'
import CompaniesTable from './CompaniesTable'
import { Link } from 'react-router-dom'

export default function Companies() {
  const [filter,setFilter]=useState();
  return (
    <div >
      <Navbar />

      <div className=' grid max-w-6xl m-auto'>
        <div className='flex min-w-[100%]  justify-between mx-auto my-10'>
          <div className='flex  items-center gap-2'>
            <Search />
            <Input onChange={(e)=>{setFilter(e.target.value);}} className=' w-50 ' placeholder='Search ...'>
            </Input>
          </div>
          <div className='flex  items-center gap-2'>

            <Link to={'/admin/companies/create'}><Button className='flex gap-2 items-center w-50'>   <Building2 /><span> New Company </span></Button></Link>
          </div>
        </div>
        <CompaniesTable filter={filter}  setFilter={setFilter}/>
      </div >
    </div>
  )
}
