import { Contact, Edit, Mail } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";

export default function Profile() {
  const {user}=useSelector(store=>store.auth)
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex items-center justify-evenly">
          <Avatar className='h-24 w-24'>
            <AvatarImage src="https://github.com/shadcn.png">

            </AvatarImage>
          </Avatar>
        
        <div>
          <h1 className="font-semibold text-xl">Full Name </h1>
          <p>Add you bio here Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
        </div>
        <div className="">
          <Edit />
        </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex  gap-4 m-2 text-lg items-center"><Mail/> {user.email}</div>
        <div className="flex  gap-4 m-2 text-lg items-center"><Contact/> {user.phoneNumber}</div>

       
      </div>
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
          <h1>Skills </h1>
          {user?.profile?.skills &&
    user.profile.skills.map((item, ind) => (
      <Badge key={ind}>{item}</Badge>
    ))
  }
        </div>
    </div>
  )
}
