/* eslint-disable react/prop-types */
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check,  Ellipsis, X } from 'lucide-react';
import axios from 'axios';
import { APPLICATION_END_POINT } from '@/utils/constants';
import { toast } from 'sonner';

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options); // en-GB format gives 'dd MMM yyyy'
}
export default function ApplicantsTable({ data }) {
  const sendStatus=async(id , status,applicantName)=>{
    try {
      const resp=await axios.post(`${APPLICATION_END_POINT}/status/${id}/update`,{"status":status},{withCredentials:true, headers:{"Content-Type":'application/json'}});
      if(resp?.data.success){
        toast.success(resp.data.message +" for "+applicantName)
      }else {
        // Show a warning toast if the response indicates failure
        toast.warning(resp.data.message || "Login failed. Please try again.");
        console.log("else triggered")
      }
      
    } catch (error) {
      console.log(error)
      toast.warning(error.response?.data?.message || "An error occurred. Please try again.");
    }
    }
  return (
    <div className='max-w-7xl mx-auto my-10 border-2 border-gray-100 rounded-2xl p-10'>
      <h1 className='text-center text-blue-800 font-bold text-2xl mb-8'>Applications</h1>
      {data ? <Table>
        
        <TableCaption>List of applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="  text-center text-lg dark:text-white">Name</TableHead>
            <TableHead className="  text-center text-lg dark:text-white">Email</TableHead>
            <TableHead className="  text-center text-lg dark:text-white">Phone Number</TableHead>
            <TableHead className="  text-center text-lg dark:text-white">Date</TableHead>
            <TableHead className="  text-center text-lg dark:text-white">Resume</TableHead>
            <TableHead className="  text-center text-lg dark:text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {data?.applications?.map((appn, ind) => { return (
            <>
            <TableRow key={ind} className="  text-center text-lg ">
              <TableCell>{appn.applicant?.fullName}</TableCell>
              <TableCell>{appn.applicant?.email}</TableCell>
              <TableCell>{appn.applicant?.phoneNumber}</TableCell>
              <TableCell>{formatDate(appn.createdAt)}</TableCell>
              <TableCell className='  overflow-clip'>
                {appn.applicant?.profile?.resume?<a className='underline text-blue-700' target='blank' href={appn.applicant?.profile?.resume}>
                  {appn.applicant?.profile?.resumeOriginalName?.slice(0,18)+"..."}</a>:
                  <h1>No resume present</h1>}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant='ghost'>
                          <Ellipsis/>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='flex flex-col w-30 rounded-xl gap-4'>
                        <Button onClick={()=>{sendStatus(appn._id,"accepted",appn.applicant?.fullName)}} variant='ghost'><div className='flex items-center gap-2 bg-green-300 p-3 rounded-lg dark:bg-green-700'><Check/><p>Accept</p></div></Button>
                        <Button onClick={()=>{sendStatus(appn._id,"rejected",appn.applicant?.fullName)}} variant='ghost'><div className='flex items-center gap-2 p-3 rounded-lg bg-red-300 dark:bg-red-700'><X/><p>Reject</p></div></Button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
              </TableRow>
            
            </>) })}

        </TableBody>
      </Table> : " false"}
    </div>

  )
}
