import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { setUser } from "../../../redux/authSlice";
import { toast } from "sonner";

export default function Navbar() {
  const dispatch=useDispatch();
  const nav=useNavigate();
  
  const logOut = async () => {
    try {
      const resp = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
      if(resp.data.success){
        dispatch(setUser(null))
        nav('/')
        toast.success(resp.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.success(error.response.data.message)
    }
  }

  //const user = false;
  const { user } = useSelector(store => store.auth)
  return (
    <div className="bg-white sticky top-0 z-50">
      <div className="  flex items-center justify-between mx-auto max-w-5xl px-2 shadow-sm h-16">
        <div onClick={()=>nav('/') } className='cursor-pointer'>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-5">
            {/* <li><Link></Link></li> */}
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/jobs'}>Jobs</Link></li>
            <li><Link to={'/browse'}>Browse</Link></li>
          </ul>
          {!user ? (
            <div className="flex gap-2">
              <Button variant="outline">
                <Link to={'/login'}>Login </Link>
              </Button>
              <Button className="bg-[#6A38C2] hover:bg-[#442181]">
                <Link to={'/signup'}> Signup </Link>
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={ user?.profile?.profilePhoto ?user?.profile?.profilePhoto: "https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 ">
                <div className="flex gap-4 space-y-1">
                  <Avatar className="flex flex-col my-[auto]">
                    <AvatarImage src={ user?.profile?.profilePhoto ?user?.profile?.profilePhoto: "https://github.com/shadcn.png"} />
                  </Avatar>
                  <div className="flex flex-col my-[auto]">
                    <h3 className="font-medium text-lg">{user.fullName}</h3>
                    <h4 className="">{user.email}</h4>
                  </div>
                </div>
                <div className="flex flex-col mt-4 text-gray-600">
                  <div className="flex align-middle">
                    <User2 className="flex flex-col my-[auto]" />
                    <Button variant="link" className="">
                      <Link to={'/profile'}>View Profile</Link>
                    </Button>
                  </div>
                  <div onClick={()=>{logOut()}} className="flex align-middle">
                    <LogOut className="flex flex-col my-[auto]" />
                    <Button  variant="link" className=" ">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}
