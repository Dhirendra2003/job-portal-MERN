import { useState } from 'react'
import Navbar from './shared/Navbar'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Building2 } from 'lucide-react'
import axios from 'axios'
import { COMPANY_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { setCompanyDetails } from '../../redux/singleCompanySlice'
import { useDispatch } from 'react-redux'

export default function CreateCompany() {
  const [name, setName] = useState();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const setCompanyInfo = async (data) => {
    dispatch(setCompanyDetails(data))
  }
  const registerCompany = async () => {
    // console.log(name);
    try {
      const resp = await axios.post(`${COMPANY_END_POINT}/register`, { 'companyName': name }, { withCredentials: true });
      if (resp.data.success) {
        setCompanyInfo(resp.data.company)
        toast.success(resp.data.message);
        nav(`/admin/companies/${resp.data.company?._id}`)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }

  }


  return (
    <div>
      <Navbar />
      <div className='max-w-7xl p-10 m-auto my-10 flex flex-col gap-8'>
        <div className='flex items-center gap-3 underline-offset-4 text-slate-600 underline'>
          <h1 className='text-3xl font-bold text-nowrap'>Register Your Company  </h1>
          <span><Building2 /></span>
        </div>
        <h1 className='text-2xl font-normal'>What would you like to name your Company?</h1>
        <div className='flex text-nowrap gap-4 items-center'>
          <h2 className='text-lg '>Company Name :</h2>
          <Input onChange={(e) => { setName(e.target.value) }} placeholder='Wipro , TCS , Tesla.LTD etc.' className='max-w-[50%]'></Input>
        </div>
        <div className='flex text-nowrap gap-4 items-center'>
          <Button variant='outline'>Cancel</Button>
          <Button onClick={() => registerCompany()} >Create</Button>

        </div>
      </div>
    </div>
  )
}
