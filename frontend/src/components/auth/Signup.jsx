import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../redux/authSlice'
import { Loader2, AlertCircle } from 'lucide-react'

export default function Signup() {
  const [input, setInput] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: ''
  })
  
  // Adding validation states
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: ''
  })

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { loading, user } = useSelector(store => store.auth)
  
  const validateInput = () => {
    let isValid = true;
    const newErrors = {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      role: ''
    };
    
    // Validate full name
    if (!input.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    } else if (input.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
      isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(input.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate phone number (basic format validation)
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!input.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(input.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number (+911111... or 10-15 digits)';
      isValid = false;
    }
    
    // Validate password strength
    if (!input.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (input.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    } else if (!/(?=.*[a-z])/.test(input.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
      isValid = false;
    } else if (!/(?=.*[A-Z])/.test(input.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
      isValid = false;
    } else if (!/(?=.*\d)/.test(input.password)) {
      newErrors.password = 'Password must contain at least one number';
      isValid = false;
    } else if (!/(?=.*[!@#$%^&*])/.test(input.password)) {
      newErrors.password = 'Password must contain at least one special character (!@#$%^&*)';
      isValid = false;
    }
    
    // Validate role selection
    if (!input.role) {
      newErrors.role = 'Please select a role';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({...errors, [e.target.name]: ''})
    }
  }
  
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Validate form inputs before submission
    if (!validateInput()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    const formdata = new FormData();
    formdata.append("fullName", String(input.fullName));
    formdata.append("email", String(input.email));
    formdata.append("phoneNumber", String(input.phoneNumber));
    formdata.append("password", String(input.password));
    formdata.append("role", String(input.role));
    
    if (input.file) {
      formdata.append("file", input.file)
    }
    
    try {
      dispatch(setLoading(true))
      const resp = await axios.post(`${USER_API_END_POINT}/register`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      })
      if (resp.data.success) {
        navigate('/login')
        toast.success(resp.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    finally {
      dispatch(setLoading(false))
    }
  }
  
  const nav = useNavigate();
  useEffect(() => {
    if (user) {
      nav('/')
    }
  },[])
  
  // Error display component for form fields
  const ErrorMessage = ({ message }) => {
    return message ? (
      <div className="text-red-500 text-sm mt-1 flex items-center">
        <AlertCircle className="h-4 w-4 mr-1" />
        {message}
      </div>
    ) : null;
  };
  
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-[auto]'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 dark:border-gray-600 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign Up </h1>
          <div className="mb-3">
            <Label>Full name*</Label>
            <Input 
              type="text" 
              value={input.fullName} 
              name="fullName" 
              onChange={changeEventHandler} 
              placeholder="Enter your full name"
              className={errors.fullName ? "border-red-500" : ""}
            />
            <ErrorMessage message={errors.fullName} />
          </div>
          
          <div className="mb-3">
            <Label>Email*</Label>
            <Input 
              value={input.email} 
              name="email" 
              onChange={changeEventHandler} 
              type="email" 
              placeholder="Enter your email address"
              className={errors.email ? "border-red-500" : ""}
            />
            <ErrorMessage message={errors.email} />
          </div>
          
          <div className="mb-3">
            <Label>Phone Number*</Label>
            <Input 
              value={input.phoneNumber} 
              name="phoneNumber" 
              onChange={changeEventHandler} 
              type="tel" 
              placeholder="+911111... or 10-15 digits"
              className={errors.phoneNumber ? "border-red-500" : ""}
            />
            <ErrorMessage message={errors.phoneNumber} />
          </div>
          
          <div className="mb-3">
            <Label>Password*</Label>
            <Input 
              value={input.password} 
              name="password" 
              onChange={changeEventHandler} 
              type="password" 
              placeholder="8+ chars with uppercase, lowercase, number & symbol"
              className={errors.password ? "border-red-500" : ""}
            />
            <ErrorMessage message={errors.password} />
          </div>
          
          <div className='md:flex items-center gap-5 mb-3'>
            <div>
              <Label>Role*</Label>
              <RadioGroup defaultValue="comfortable" className='flex justify-center items-center my-3 space-x-2'>
                <div className="flex items-center space-x-2">
                  <Input 
                    type='radio' 
                    name='role' 
                    value='student' 
                    className='cursor-pointer' 
                    id='r1' 
                    checked={input.role === 'student'} 
                    onChange={changeEventHandler}
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input 
                    type='radio' 
                    name='role' 
                    value='recruiter' 
                    className='cursor-pointer' 
                    id='r2' 
                    checked={input.role === 'recruiter'} 
                    onChange={changeEventHandler} 
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
              <ErrorMessage message={errors.role} />
            </div>

            <div className='md:flex justify-center items-center gap-2 ml-[auto]'>
              <Label>Profile Photo</Label>
              <Input 
                accept='image/*' 
                type="file" 
                onChange={changeFileHandler} 
                className="cursor-pointer"
              />
            </div>
          </div>

          {loading ? (
            <Button className='my-4 w-full' disabled>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait
            </Button>
          ) : (
            <Button type='submit' className='my-4 w-full'>Sign Up</Button>
          )}
          
          <div className="text-center">
            Already have an account? <Link to='/login' className='text-blue-500 font-medium'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}