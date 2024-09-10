/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../../redux/authSlice'
import { Loader2 } from 'lucide-react'



export default function Login() {

  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',


  })
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const {loading,user}=useSelector(store=>store.auth)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
   
var resp;
    try {
      dispatch(setLoading(true))
       resp = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      if (resp.data.success) {
        dispatch(setUser(resp.data.user));
        if(input.role==='student')
       { navigate('/')}
      if(input.role==='recruiter')
      { navigate('/admin/companies')}
        toast.success(resp.data.message);
      }
      else {
        // Show a warning toast if the response indicates failure
        toast.warning(resp.data.message || "Login failed. Please try again.");
        console.log("else triggered")
      }
      
    } catch (error) {
      console.log(error)
      toast.warning(error.response?.data?.message || "An error occurred. Please try again.");
    }
    finally{
      dispatch(setLoading(false))
    }
  }
  const nav = useNavigate();
  useEffect(() => {
    if (user) {
      nav('/')
    }
  },[])
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-[auto]'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login </h1>

          <div>
            <Label>Email</Label>
            <Input value={input.email} name="email" onChange={changeEventHandler} type="email" placeholder="Email@"></Input>
          </div>

          <div>
            <Label>Password</Label>
            <Input value={input.password} name="password" onChange={changeEventHandler} type="password" placeholder="8 chars, alphanumeric & symbols"></Input>
          </div>
          <div className='flex  items-center gap-5'>
            <RadioGroup defaultValue="comfortable" className='flex justify-center items-center my-3 space-x-2'>
              <div className="flex items-center space-x-2">
                <Input type='radio' name='role' value='student' className='cursor-pointer' id='r1' checked={input.role === 'student'} onChange={changeEventHandler}
                ></Input>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type='radio' name='role' value='recruiter' className='cursor-pointer' id='r2' checked={input.role === 'recruiter'} onChange={changeEventHandler} ></Input>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

          </div>
{loading? <Button className='my-4 w-full'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>:<Button className='my-4 w-full' type='submit' >Login</Button>}

          
          <span >Don't have an account? <Link to='/signup' className='text-blue-500 font-medium'>Sign up</Link></span>
        </form>
      </div>
    </div>
  )
}
