
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
    <Table className='my-5 dark:bg-neutral-900'>
      <TableCaption>A list of your applied jobs.</TableCaption>
      <TableHeader className='my-10'>
        <TableRow >
          <TableHead className="  text-center text-lg dark:text-white">Date</TableHead>
          <TableHead className="  text-center text-lg dark:text-white">Company</TableHead>
          <TableHead className="  text-center text-lg dark:text-white">Job Role</TableHead>
          <TableHead className="  text-center text-lg dark:text-white" >Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { appln? appln.map((invoice, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium   text-center">{convertDate(invoice.updatedAt)}</TableCell>
            <TableCell className='text-md font-semibold flex m-auto  capitalize'>
              <div className=" flex items-center gap-2 m-auto"><Avatar ><AvatarImage src={invoice.job?.company?.logo}></AvatarImage></Avatar><p>{invoice.job?.company?.name}</p></div></TableCell>
            <TableCell className='text-lg font-semibold  capitalize text-wrap text-center'>{invoice?.job?.title}</TableCell>
            <TableCell className='  text-center '><Button variant='outline' className={'rounded-full capitalize dark:bg-neutral-700 ' + (invoice.status === "accepted" && " bg-green-200 dark:bg-green-700 ") + (invoice.status === "rejected" && " bg-red-200 dark:bg-red-700 ")} >{invoice.status}</Button></TableCell>
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
