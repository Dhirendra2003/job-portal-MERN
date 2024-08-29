import { COMPANY_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { setCompanyDetails } from '../../redux/singleCompanySlice';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { ArrowLeft, Building2 } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react'

export default function CompanyEdit() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  var { company } = useSelector(store => store.company)
  useEffect(() => {
    const getCompanyInfo = async () => {
      try {
        const resp = await axios.get(`${COMPANY_END_POINT}/get/${id}`, { withCredentials: true });
        if (resp.data.success) {
          dispatch(setCompanyDetails(resp.data.company))
          // console.log('success')
          setInput({
            companyName: resp.data.company ? resp.data.company.name : '',
            description: resp.data.company ? resp.data.company.description : '',
            website: resp.data.company ? resp.data.company.website : '',
            location: resp.data.company ? resp.data.company.location : '',
            file: ''
          });
        }
      } catch (error) {
        console.log(error)
      }
    }
    getCompanyInfo();
    console.log("update called")
   
  }, [])
  const [input, setInput] = useState({
    companyName: company ? company.name : '',
    description: company ? company.description : '',
    website: company ? company.website : '',
    location: company ? company.location : '',
    file: ''

  })
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const nav = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input)
    const formdata = new FormData();
    formdata.append("name", String(input.companyName));
    formdata.append("description", String(input.description));
    formdata.append("website", String(input.website));
    formdata.append("location", String(input.location));
    if (input.file) {
      formdata.append("file", input.file)
    }
    try {
      setLoading(true);
      const resp = await axios.post(`${COMPANY_END_POINT}/update/${id}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      })
      if (resp.data.success) {
        nav('/admin/companies')
        toast.success(resp.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    finally {
      setLoading(false);
    }
  }


  return (
    <div className='min-h-screen'>
      <Navbar />
      <form onSubmit={submitHandler}>
        <div className='max-w-7xl m-auto'>

          <div className='flex min-w-[100%]  justify-between mx-auto my-10 p-10 items-center'>
            <div className='flex  items-center gap-2'>
              <Link to={'/admin/companies'}>
                <Button variant='outline' className='flex gap-4 items-center w-50'>   <ArrowLeft /><span> Skip</span></Button></Link>
            </div>
            <h1 className='mr-auto ml-10 font-semibold text-2xl'>Company Setup</h1>
            <div className='flex  items-center gap-2'>

              {loading ? <Button type='disable' className='flex gap-4 items-center w-50 cursor-not-allowed'>   <Loader2 className='mr-2 h-4 w-4 animate-spin' /><span> Updating... </span></Button> :
                <Button type='submit' className='flex gap-4 items-center w-50'>   <Building2 /><span> Update Details </span></Button>}
            </div>
          </div>

          <div className='grid grid-cols-2 max-w-xl m-auto gap-8 '>
            <div>
              <Label>Company Name</Label>
              <Input value={input.companyName} name="companyName" onChange={changeEventHandler} type="text" placeholder="Org pvt.ltd. ..."></Input>
            </div>

            <div>
              <Label>About Company</Label>
              <Input value={input.description} name="description" onChange={changeEventHandler} type="text" placeholder="description of company"></Input>
            </div>

            <div>
              <Label>Website</Label>
              <Input value={input.website} name="website" onChange={changeEventHandler} type="text" placeholder="www.org.com.."></Input>
            </div>

            <div>
              <Label>Location</Label>
              <Input value={input.location} name="location" onChange={changeEventHandler} type="text" placeholder="Delhi ,India ..."></Input>
            </div>

            <div>
              <Label>Logo</Label>
              <Input accept='image/*' type="file" name="location" onChange={changeFileHandler} className="cursor-pointer"></Input>
            </div>
          </div>

        </div>
      </form>
    </div>

  )
}
