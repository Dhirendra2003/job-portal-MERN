import { Contact, Edit, Mail } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";

export default function Profile() {
  const { user } = useSelector(store => store.auth)

  const tailwindBgColors500 = [
    "bg-slate-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-rose-500"
  ];
  const [openEditor, setOpenEditor]=useState(false);
  function getRandomValueFromArray(array) {
    if (array.length === 0) return null; // Handle empty array case
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  return (
    <div>
      <Navbar />
      {user ? <>
        <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 dark:bg-neutral-900">
          <div className="flex items-center justify-evenly">
            <Avatar className='h-24 w-24'>
              <AvatarImage src={ user?.profile?.profilePhoto ?user?.profile?.profilePhoto: "https://github.com/shadcn.png"}>

              </AvatarImage>
            </Avatar>

            <div className=" m-4 text-justify grid gap-2 ">
              <h1 className="font-semibold text-xl capitalize">{user?.fullName} </h1>
              <p>{user?.profile?.bio}</p>
            </div>
            <div className="">
             <Button onClick={()=>{setOpenEditor(true)}} variant='ghost' size='icon'> <Edit /></Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 dark:bg-neutral-900">
          <h1 className="text-xl font-semibold">Contacts</h1>
          <div className="flex  gap-4 m-2 text-lg items-center"><Mail /> {user.email}</div>
          <div className="flex  gap-4 m-2 text-lg items-center"><Contact /> {user.phoneNumber}</div>
        </div>

        <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 dark:bg-neutral-900">
          <h1 className="text-xl font-semibold ">Resume</h1>
          {
            user?.profile?.resume ? <a className="text-blue-700 font-normal text-2xl underline dark:text-blue-400 " href={user?.profile?.resume} target="blank">{user?.profile?.resumeOriginalName}</a> : "N/A"
          }
        </div>
        <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 dark:bg-neutral-900">
          <h1 className="text-xl font-semibold">Skills </h1>
          {user?.profile?.skills ?
            // codingSkills.map((item, ind) => (
              user.profile.skills.map((item, ind) => (
              <Badge key={ind} className={'m-2 text-md hover:scale-110 ' + getRandomValueFromArray(tailwindBgColors500)}>{item}</Badge>
            ))
            : <h1>N/A</h1>
          }
        </div>
       
        <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 dark:bg-neutral-900">
        <h1 className="text-xl font-semibold">Applied Jobs</h1>
        <AppliedJobTable/>
          </div>
          <div>
            <UpdateProfileDialog openEditor={openEditor} setOpenEditor={setOpenEditor }></UpdateProfileDialog>
          </div>


      </>
        :
        <div className="min-h-[88vh] items-center flex">
          <div className="max-w-4xl my-auto bg-white border border-gray-200 rounded-2xl m-auto p-8 items-center grid">
            <h1 className="text-5xl text-center">Please Login First</h1>
            <Button className='w-20 m-auto my-5'>
              <Link to={'/login'}>Login </Link>
            </Button>
          </div>
        </div>
      }
    </div>
  )
}
