/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Building2, Edit2, EyeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { useSelector } from "react-redux";



export default function AdminJobsTable(props) {
  // const [compData, setCompData] = useState()
  // const [filterData, setFilterData] = useState();

  useGetAllAdminJobs();
  const { adminJobs } = useSelector(store => store.adminJobs);
  const [jobsData, setJobsData] = useState();
  useEffect(() => {
    if (!props.filter) {
      setJobsData(adminJobs); // If no filter text, show all data
    } else {
      const filtered = adminJobs.filter(job =>
        job?.title?.toLowerCase().includes(props.filter.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(props.filter.toLowerCase()) ||
        job?.location?.toLowerCase().includes(props.filter.toLowerCase())

      );
      setJobsData(filtered);
    }
  }, [adminJobs, props.filter]);
  function convertDate(date) {
    var newDate = new Date(date);
    var dateStr = newDate.toLocaleDateString("en-GB");
    return dateStr
  }
  return (
    <>
      {adminJobs ? <Table className='my-5'>
        <TableCaption>A list of your Listed Jobs.</TableCaption>
        <TableHeader className='my-10'>
          <TableRow >
            <TableHead className="  text-center text-lg ">Company</TableHead>
            <TableHead className="  text-center text-lg ">Job Title</TableHead>
            <TableHead className="  text-center text-lg ">Location</TableHead>
            <TableHead className="  text-center text-lg ">Date</TableHead>
            <TableHead className="  text-center text-lg " >Applicants</TableHead>
            <TableHead className="  text-center text-lg " >Edit</TableHead>
            <TableHead className="  text-center text-lg text-wrap w-20 " >View Applications</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobsData && jobsData.map((comp, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium flex items-center   ">{comp.company?.logo ? <div className="flex items-center gap-2 m-auto"><Avatar >
                <AvatarImage className="w-8 h-8 m-auto" src={comp.company?.logo}></AvatarImage ></Avatar><h1>{comp.company.name}</h1></div> : <Building2 className="m-auto" />}</TableCell>
              <TableCell className="font-medium text-xl text-wrap max-w-20 text-center">{comp.title}</TableCell>
              <TableCell className='text-lg font-meduim text-center'>{comp.location}</TableCell>
              <TableCell className='text-md font-semibold text-center text-blue-700'>{convertDate(comp.createdAt)}</TableCell>
              <TableCell className='  text-center text-nowrap overflow-hidden '>{comp?.applications?.length}</TableCell>
              <TableCell className='  text-center text-nowrap overflow-hidden '><Link to={`/admin/job/edit/${comp._id}`}><Button variant='ghost'><Edit2 /></Button></Link></TableCell>
              <TableCell className='flex'>
                <Link className='m-auto' to={`/admin/applications/${comp._id}`}>
                  <Button className='m-auto' variant='ghost'>
                    <EyeIcon />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>Total</TableCell>
        <TableCell className="text-right">$2,500.00</TableCell>
      </TableRow>
    </TableFooter> */}
      </Table>
        :
        <h1>No Companies are Registered with This user</h1>
      }
    </>
  )
}
