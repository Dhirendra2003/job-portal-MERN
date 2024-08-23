import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <div className="text-center">
      <span className='px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium my-auto'>No. 1 Job Hunt Website
      </span>
      <h1 className="text-5xl font-bold m-4 line- ">Search , Apply & <br /> Get Your <span className="text-[#6A38C2]">Dream Jobs</span></h1>
      <p className=" text-center mx-[auto] my-4 max-w-[60vw] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit repellendus maiores placeat saepe qui perspiciatis.</p>
      <div className="flex w-[40%] shadow-lg border-gray-200 border-2 p-2  rounded-full items-center gap-4 m-auto ">
        <input type="text" placeholder="Find Your Dream Jobs" className="outline-none border-none w-full px-4" />
        <Button className='rounded-3xl py-4 px-2 bg-[#6A38C2]'>
          <Search className="text-white"/>
        </Button>
      </div>
    </div>
  )
}
