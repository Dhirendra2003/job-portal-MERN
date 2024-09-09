
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_END_POINT } from "@/utils/constants";
import { Avatar, AvatarImage } from "./ui/avatar";

function convertDate(date) {
  var newDate = new Date(date);
  var dateStr = newDate.toLocaleDateString("en-GB");
  return dateStr
}

const applnList = [
  {
    date: "2024-01-15",
    jobRole: "Software Engineer",
    companyName: "TechCorp",
    status: "Pending"
  },
  {
    date: "2024-02-01",
    jobRole: "Data Analyst",
    companyName: "DataSolutions",
    status: "Rejected"
  },
  {
    date: "2024-02-10",
    jobRole: "Backend Developer",
    companyName: "CodeWorks",
    status: "Accepted"
  },
  {
    date: "2024-03-05",
    jobRole: "Frontend Developer",
    companyName: "WebCraft",
    status: "Pending"
  },
  {
    date: "2024-03-20",
    jobRole: "Full Stack Developer",
    companyName: "InnovateX",
    status: "Rejected"
  },
  {
    date: "2024-04-10",
    jobRole: "UX Designer",
    companyName: "DesignHub",
    status: "Accepted"
  },
  {
    date: "2024-04-25",
    jobRole: "DevOps Engineer",
    companyName: "CloudOps",
    status: "Pending"
  },
  {
    date: "2024-05-05",
    jobRole: "Project Manager",
    companyName: "BuildIt",
    status: "Rejected"
  },
  {
    date: "2024-05-18",
    jobRole: "Business Analyst",
    companyName: "BizInsights",
    status: "Accepted"
  },
  {
    date: "2024-06-02",
    jobRole: "QA Engineer",
    companyName: "Testify",
    status: "Pending"
  }
];




export default function AppliedJobTable() {
  const [appln, setAppln] = useState();
  useEffect(() => {
    const findApplications = async () => {
      try {
        const resp = await axios.get(`${APPLICATION_END_POINT}/get`, { withCredentials: true });
        if (resp.data.success) {
          setAppln(resp.data.application)
        }
      } catch (error) {
        console.log(error)
      }
    }
    findApplications()
  },[])
  return (
    <Table className='my-5'>
      <TableCaption>A list of your applied jobs.</TableCaption>
      <TableHeader className='my-10'>
        <TableRow >
          <TableHead className="  text-center text-lg ">Date</TableHead>
          <TableHead className="  text-center text-lg ">Company</TableHead>
          <TableHead className="  text-center text-lg ">Job Role</TableHead>
          <TableHead className="  text-center text-lg " >Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { appln? appln.map((invoice, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium   text-center">{convertDate(invoice.updatedAt)}</TableCell>
            <TableCell className='text-md font-semibold flex m-auto  capitalize'>
              <div className=" flex items-center gap-2 m-auto"><Avatar ><AvatarImage src={invoice.job?.company?.logo}></AvatarImage></Avatar><p>{invoice.job?.company?.name}</p></div></TableCell>
            <TableCell className='text-lg font-semibold  capitalize text-wrap text-center'>{invoice?.job?.title}</TableCell>
            <TableCell className='  text-center '><Button variant='outline' className={'rounded-full capitalize ' + (invoice.status === "accepted" && " bg-green-200 ") + (invoice.status === "rejected" && " bg-red-200")} >{invoice.status}</Button></TableCell>
          </TableRow>
        )):"No Applications found !"}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  )
}
