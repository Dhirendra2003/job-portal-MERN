import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [sq, setSq] = useState();
  const updateSq = (data) => {
    setSq(data);
  }
  const nav=useNavigate();
  return (
    <div className="text-center my-10">
    <span className='px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium '>Best Job Hunt Website
    </span>
    <h1 className="md:text-5xl font-bold xs:fon m-4 sm:text-3xl"> Connecting Talent <br /> with <span className="text-[#2C89FD]">Opportunity</span></h1>
    <p className=" text-center mx-[auto] my-4 max-w-[60vw] ">Find your dream job or hire the perfect candidate — fast, simple, and tailored to your needs.</p>
    <div className="flex md:w-[40%] xs:w-[70%] shadow-lg border-gray-200 border-2 p-2  rounded-full items-center gap-4 m-auto ">
      <input onChange={(e)=>{updateSq(e.target.value)}} type="text" placeholder="Find Your Dream Jobs" className="outline-none border-none w-full px-4 dark:bg-black" />
      <Button className='rounded-3xl py-4 px-2 bg-[#2C89FD]'>
        <Search onClick={()=>nav(`/browse?searchstring=${sq}`)} className="text-white" />
      </Button>
    </div>
  </div>
  )
}
