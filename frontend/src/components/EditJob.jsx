import { ArrowLeft, BriefcaseBusiness, Loader2 } from 'lucide-react'
import Navbar from './shared/Navbar'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import axios from 'axios'
import { COMPANY_END_POINT, JOB_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import useGetJobDetails from '@/hooks/useGetJobDetails'
import { useSelector } from 'react-redux'

export default function EditJob() {
  const { id } = useParams();
  useGetJobDetails(id)
  const { job } = useSelector(store => store.sJob)

  const [compData, setCompData] = useState()

  useEffect(() => {
    const getComp = async () => {
      try {
        const resp = await axios.get(`${COMPANY_END_POINT}/get`, { withCredentials: true });
        if (resp.data.success) {
          // console.log(resp.data.companies);

          if (resp.data.companies.length > 0) {
            setCompData(resp.data.companies)
            // setFilterData(resp.data.companies)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    getComp();

  }, [])
  const [loading, setLoading] = useState(false);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const [input, setInput] = useState({
    title: '',
    description: '',
    location: '',
    position: 1,
    salary: '',
    jobType: '',
    experience: '',
    companyId: '',
    requirements: ''
  })
  const changeCompanyHandler = (e) => {
    setInput({ ...input, companyId: e })
  }
  const nav = useNavigate();
  const postJob = async (e) => {
    e.preventDefault();
    //  console.log(input)
    try {
      setLoading(true);
      const resp = await axios.post(`${JOB_END_POINT}/edit/${id}`, input, { withCredentials: true, headers: { "Content-Type": 'application/json' } });
      if (resp.data.success) {
        nav('/admin/jobs')
        toast.success(resp.data.message);
      }
      else {
        toast.warning(resp.data.message || "edit job failed");
      }
    } catch (error) {
      toast.warning(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // console.log(id+"this is from useeefect")
    var reqString = job.requirements.map((obj) => obj).join(",");
    console.log(reqString)
    setInput({
      title: job.title,
      description: job.description,
      location: job.location,
      position: Number(job.positions),
      salary: job.salary,
      jobType: job.jobType,
      experience: job.experienceLevel,
      companyId: job.company._id,
      requirements: reqString
    })
    console.log(job?.company?.name)
  }, [job])
  return (
    <div className='min-h-screen mb-40'>
      <Navbar />
      <form onSubmit={(e) => { postJob(e) }}>
        <div className='max-w-7xl m-auto'>

          <div className='flex min-w-[100%]  justify-between mx-auto my-10 p-10 items-center'>
            <div className='flex  items-center gap-2'>
              <Link to={'/admin/jobs'}>
                <Button variant='outline' className='flex gap-4 items-center w-50'>   <ArrowLeft /><span> Skip</span></Button></Link>
            </div>
            <h1 className='mr-auto ml-10 font-semibold text-2xl'>Edit job</h1>
            <div className='flex  items-center gap-2'>

              {loading ? <Button type='disable' className='flex gap-4 items-center w-50 cursor-not-allowed'>   <Loader2 className='mr-2 h-4 w-4 animate-spin' /><span> Updating... </span></Button> :
                <Button type='submit' className='flex gap-4 items-center w-50'>   <BriefcaseBusiness /><span> Edit Job </span></Button>}
            </div>
          </div>

          <div className='grid grid-cols-2 max-w-xl m-auto gap-8 '>
            <div>
              <Label>Job Title</Label>
              <Input required={true} value={input.title} name="title" onChange={changeEventHandler} type="text" placeholder="JR. Executive..."></Input>
            </div>

            <div>
              <Label>Description</Label>
              <Input required={true} value={input.description} name="description" onChange={changeEventHandler} type="text" placeholder="description of job"></Input>
            </div>

            <div>
              <Label>Location</Label>
              <Input required={true} value={input.location} name="location" onChange={changeEventHandler} type="text" placeholder="Delhi , remote ,etc."></Input>
            </div>

            <div>
              <Label>Job Type</Label>
              <Input required={true} value={input.jobType} name="jobType" onChange={changeEventHandler} type="text" placeholder="Full-time / part-time ..."></Input>
            </div>

            <div>
              <Label>Experience (in years)</Label>
              <Input required={true} value={input.experience} name="experience" onChange={changeEventHandler} type="number" min={0} placeholder=" 6 months / 3 years ... "></Input>
            </div>

            <div>
              <Label>Required Skills</Label>
              <Input value={input.requirements} name="requirements" onChange={changeEventHandler} type="text" placeholder="Management , Marketing ..."></Input>
              <p className='text-xs px-2 opacity-60'>separate by coma ','</p>
            </div>

            <div>
              <Label>Salary</Label>
              <Input value={input.salary} name="salary" onChange={changeEventHandler} type="text" placeholder=" Enter monthly salary only"></Input>
            </div>

            <div>
              <Label>Number of Positions</Label>
              <Input value={Number(input.position)} name="position" onChange={changeEventHandler} min={1} type="number" placeholder="1/2/5"></Input>
            </div>

            <div className='m-auto col-span-2'>
              <Label>Select Company</Label>
              {compData?.length > 0 ? <Select value={input.companyId} required={true} onValueChange={changeCompanyHandler} name='companyId' >
                <SelectTrigger className="w-[580px]">
                  <SelectValue placeholder="Companies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup >
                    <SelectLabel>Companies</SelectLabel>
                    {compData?.map((comp, index) => {
                      return (<SelectItem value={comp?._id} onChange={changeEventHandler} name='companyId' key={index} >{comp?.name}</SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select> :
                <div className='flex gap-2 items-center my-4'>
                  <h1>create a company first</h1>
                  <Link to={'/admin/companies/create'}><Button>Create Company</Button></Link>
                </div>
              }
            </div>
          </div>


        </div>
      </form>
    </div>
  )
}
