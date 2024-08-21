import { Link } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";

export default function Navbar() {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-5xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-5">
            {/* <li><Link></Link></li> */}
            <li>home</li>
            <li>jobs</li>
            <li>Browse</li>
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
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 ">
                <div className="flex gap-4 space-y-1">
                  <Avatar className="flex flex-col my-[auto]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div className="flex flex-col my-[auto]">
                    <h3 className="font-medium text-lg">your name</h3>
                    <h4 className="">Lorem, ipsum dolor.</h4>
                  </div>
                </div>
                <div className="flex flex-col mt-4 text-gray-600">
                  <div className="flex align-middle">
                    <User2 className="flex flex-col my-[auto]" />
                    <Button variant="link" className="">
                      View Profile
                    </Button>
                  </div>
                  <div className="flex align-middle">
                    <LogOut className="flex flex-col my-[auto]" />
                    <Button variant="link" className=" ">
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
