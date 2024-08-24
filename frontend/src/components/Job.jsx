
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'


function Job() {
  return (
    <div className=' p-5 pb-2 rounded-lg shadow-lg bg-white border-2 border-gray-100 '>
      <div className='flex items-center justify-between'>
        <p>2 days ago </p>
        <Button variant='outline' className='rounded-full' size='icon'> <Bookmark /></Button>
      </div>
      <div className='flex items-center gap-4 my-2'>
        <Button variant='outline' className='p-1' size='icon'>
          <Avatar >
            <AvatarImage src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' >

            </AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h1 className='font-semibold text-lg'>Company name</h1>
          <p>India</p>
        </div>
      </div>
      <div className=''>
        <h1 className='font-bold text-xl capitalize '>marketing executive</h1>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, debitis. Amet dolorum nisi, eum assumenda distinctio tempora tenetur quisquam deserunt.</p>
      </div>
      <div className='flex gap-2'>
      <Badge variant="ghost" className='text-blue-700 font-bold'>12 Positions</Badge>
      <Badge variant="ghost" className='text-purple-700 font-bold'>part-time</Badge>
      <Badge variant="ghost" className='text-red-400 font-bold'>3.6 lpa</Badge>
      </div>
      <div className=' flex gap-4 my-4'>
        <Button className='bg-purple-700 hover:bg-purple-900'>Details</Button>
        <Button variant='outline' >Save for later</Button>
      </div>
    </div>
  )
}

export default Job