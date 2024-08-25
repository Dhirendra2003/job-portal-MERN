
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
  return (
    <Table className='my-5'>
      <TableCaption>A list of your applied jobs.</TableCaption>
      <TableHeader className='my-10'>
        <TableRow >
          <TableHead className=" max-w-[20%] text-center text-lg ">Date</TableHead>
          <TableHead className=" max-w-[35%] text-center text-lg ">Job Role</TableHead>
          <TableHead className=" max-w-[25%] text-center text-lg ">Company</TableHead>
          <TableHead className=" max-w-[20%] text-center text-lg " >Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applnList.map((invoice,index) => (
          <TableRow key={index}>
            <TableCell className="font-medium  max-w-[20%] text-center">{invoice.date}</TableCell>
            <TableCell className='text-lg font-meduim max-w-[35%] text-center'>{invoice.jobRole}</TableCell>
            <TableCell className='text-md font-semibold max-w-[25%] text-center'>{invoice.companyName}</TableCell>
            <TableCell className=' max-w-[20%] text-center'><Button variant='outline' className={'rounded-full ' + (invoice.status === "Accepted" && " bg-green-200 ") + (invoice.status === "Rejected" && " bg-red-200")} >{invoice.status}</Button></TableCell>
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
  )
}
