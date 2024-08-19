import { Link } from 'react-dom'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



export default function Navbar() {
  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-5xl h-16'>
        <div >
          <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
        </div>

        <div className='flex items-center gap-5'>
          <ul className='flex font-medium items-center gap-5'>
            {/* <li><Link></Link></li> */}
            <li>home</li>
            <li>jobs</li>
            <li>Browse</li>
          </ul>
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className='w-80 '>
              <div className='flex gap-4 space-y-1'>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <h4 className='font-medium'>your name</h4>
                <div>
                  <h4 className=''> </h4>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
