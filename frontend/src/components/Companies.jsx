import React from 'react'
import Navbar from './shared/Navbar'
import { Input } from './ui/input'
import { Building2, Search } from 'lucide-react'
import { Button } from './ui/button'
import CompaniesTable from './CompaniesTable'
import { Link } from 'react-router-dom'

export default function Companies() {
  return (
    <div >
      <Navbar />

      <div className=' grid max-w-6xl m-auto'>
        <div className='flex min-w-[100%]  justify-between mx-auto my-10'>
          <div className='flex  items-center gap-2'>
            <Search />
            <Input className=' w-50 ' placeholder='Search ...'>
            </Input>
          </div>
          <div className='flex  items-center gap-2'>

            <Button className='flex gap-2 items-center w-50'>   <Building2 /><Link to={'/admin/companies/create'}><span> New Company </span></Link></Button>
          </div>
        </div>
<CompaniesTable/>
      </div >
    </div>
  )
}
