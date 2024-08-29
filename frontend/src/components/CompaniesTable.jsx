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
import axios from "axios";
import { COMPANY_END_POINT } from "@/utils/constants";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Building2, Edit2 } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";



export default function CompaniesTable(props) {
  const [compData, setCompData] = useState()
  const [filterData, setFilterData] = useState();
  useEffect(() => {
    if (!props.filter) {
      setFilterData(compData); // If no filter text, show all data
    } else {
      const filtered = compData.filter(company =>
        company.name.toLowerCase().includes(props.filter.toLowerCase()) ||
        company.description?.toLowerCase().includes(props.filter.toLowerCase()) ||
        company.website?.toLowerCase().includes(props.filter.toLowerCase()) ||
        company.location?.toLowerCase().includes(props.filter.toLowerCase())
      );
      setFilterData(filtered);
    }
  }, [compData, props.filter]);


  useEffect(() => {
    const getComp = async () => {
      try {
        const resp = await axios.get(`${COMPANY_END_POINT}/get`, { withCredentials: true });
        if (resp.data.success) {
          // console.log(resp.data.companies);

          if (resp.data.companies.length > 0) {
            setCompData(resp.data.companies)
            setFilterData(resp.data.companies)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    getComp();

  }, [])
  return (
    <>
      {filterData ? <Table className='my-5'>
        <TableCaption>A list of your Companies.</TableCaption>
        <TableHeader className='my-10'>
          <TableRow >
            <TableHead className=" max-w-[20%] text-center text-lg ">Logo</TableHead>
            <TableHead className=" max-w-[20%] text-center text-lg ">Company Name</TableHead>
            <TableHead className=" max-w-[35%] text-center text-lg ">Location</TableHead>
            <TableHead className=" max-w-[25%] text-center text-lg ">Website</TableHead>
            <TableHead className=" max-w-[20%] text-center text-lg " >Description</TableHead>
            <TableHead className=" max-w-[20%] text-center text-lg " ></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterData && filterData.map((comp, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium   max-w-[20%] ">{comp.logo ? <Avatar >
                <AvatarImage className="w-12 h-12 m-auto" src={comp.logo}></AvatarImage ></Avatar> : <Building2 className="m-auto" />}</TableCell>
              <TableCell className="font-medium text-xl  max-w-[20%] text-center">{comp.name}</TableCell>
              <TableCell className='text-lg font-meduim max-w-[35%] text-center'>{comp.location}</TableCell>
              <TableCell className='text-md font-semibold max-w-[25%] text-center text-blue-700'><a target="blank" href={comp.website}>{comp.website}</a></TableCell>
              <TableCell className=' max-w-60 text-center text-nowrap overflow-hidden '>{comp?.description?.slice(0, 30) + "..."}</TableCell>
              <TableCell className=' max-w-60 text-center text-nowrap overflow-hidden '><Link to={`/admin/companies/${comp._id}`}><Button variant='ghost'><Edit2 /></Button></Link></TableCell>
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
