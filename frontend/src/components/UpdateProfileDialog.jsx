import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'
import {  setUser } from '../../redux/authSlice'
import { toast } from 'sonner'

// eslint-disable-next-line react/prop-types
export default function UpdateProfileDialog({ openEditor, setOpenEditor }) {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(store => store.auth)
  const dispatch =useDispatch();
  const [input, setInput] = useState({
    fullName: user.fullName,
    bio: user?.profile?.bio,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    skills: user?.profile?.skills?.map(skill => skill),
    file: user?.profile?.resume,
  })
  const changeEventListener = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const submitHandler = async(e) => {
    e.preventDefault();
    console.log(input)
    const formData = new FormData();
    formData.append("fullName", input.fullName)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("bio", input.bio)
    formData.append("skills", input.skills)
    if (input.file) {
      formData.append("file", input.file)
    }
    try {
      setLoading(true)
      const resp = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      if (resp.data.success) {
        dispatch(setUser(resp.data.user));
        toast.success(resp.data.message)
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
      setLoading(false)
    }
  }
  const fileChangeHandler = (e) => {
    var file = e.target.files?.[0];
    setInput({ ...input, file: file })

  }
  return (
    <div>
      <Dialog open={openEditor} onOpenChange={()=>setOpenEditor(false)}>
        <DialogContent aria-describedby={undefined} onInteractOutside={() => setOpenEditor(false)} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className='grid gap-4 grid-rows-4 py-4'>
              <div className='grid gap-4 grid-cols-4 items-center'>
                <Label htmlFor='name' className='text-right'>
                  Name :
                </Label>
                <Input onChange={changeEventListener} value={input.fullName} id='name' name='fullName' className='col-span-3' />
              </div>

              <div className='grid gap-4 grid-cols-4 items-center'>
                <Label htmlFor='bio' className='text-right'>
                  Bio :
                </Label>
                <Input onChange={changeEventListener} value={input.bio} id='bio' name='bio' className='col-span-3' />
              </div>

              <div className='grid gap-4 grid-cols-4 items-center'>
                <Label htmlFor='E-mail' className='text-right text-nowrap'>
                  E-mail :
                </Label>
                <Input type='email' onChange={changeEventListener} value={input.email} id='E-mail' name='email' className='col-span-3' />
              </div>

              <div className='grid gap-4 grid-cols-4 items-center'>
                <Label htmlFor='phone' className='text-right'>
                  Phone :
                </Label>
                <Input onChange={changeEventListener} value={input.phoneNumber} id='phone' name='phoneNumber' className='col-span-3' />
              </div>

              <div className='grid gap-4 grid-cols-4 items-center'>
                <Label htmlFor='Skills' className='text-right'>
                  Skills :
                </Label>
                <Input onChange={changeEventListener} value={input.skills} id='Skills' name='skills' className='col-span-3' />
              </div>
                <p className='text-xs text-center -p-2 -m-2 relative -top-2 text-gray-500'>separate skills by coma ','</p>

              <div className='grid gap-4 grid-cols-4 items-center'>
                <Label htmlFor='Resume' className='text-right'>
                  Resume :
                </Label>
                <Input onChange={fileChangeHandler} id='Resume' name='file' type="file" className='col-span-3' />
              </div>



            </div>
            <DialogFooter>
              {
                loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2> Please Wait</Button> : <Button className='w-full my-4' type='submit'>Update</Button>
              }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
