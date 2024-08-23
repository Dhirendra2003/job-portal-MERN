import  { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'

export default function Signup() {
  const [input, setInput] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: ''

  })
  const navigate=useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log(input)
    const formdata = new FormData();
    formdata.append("fullName", String(input.fullName));
    formdata.append("email", String(input.email));
    formdata.append("phoneNumber", String(input.phoneNumber));
    formdata.append("password", String(input.password));
    formdata.append("role", String(input.role));
    //formdata.append("fullName",input.file);
    if (input.file) {
      formdata.append("file", input.file)
    }
    try {
      const resp = await axios.post(`${USER_API_END_POINT}/register`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      })
      if(resp.data.success){
        navigate('/login')
        toast.success(resp.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-[auto]'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign Up </h1>
          <div>
            <Label>Full name</Label>
            <Input type="text" value={input.fullName} name="fullName" onChange={changeEventHandler} placeholder="name..."></Input>
          </div>
          <div>
            <Label>Email</Label>
            <Input value={input.email} name="email" onChange={changeEventHandler} type="email" placeholder="Email@"></Input>
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} type="tel" placeholder="+911111..."></Input>
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
                <Label htmlFor="r1">student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type='radio' name='role' value='recruiter' className='cursor-pointer' id='r2' checked={input.role === 'recruiter'} onChange={changeEventHandler} ></Input>
                <Label htmlFor="r2">recruiter</Label>
              </div>
            </RadioGroup>

            <div className='flex justify-center items-center gap-2 ml-[auto]'>
              <Label>Profile</Label>
              <Input accept='image/*' type="file" onChange={changeFileHandler} className="cursor-pointer"></Input>
            </div>
          </div>

          <Button type='submit' className='my-4 w-full'> Sign in</Button>
          <span >Already have an account? <Link to='/login' className='text-blue-500 font-medium'>Login</Link></span>
        </form>
      </div>
    </div>
  )
}
