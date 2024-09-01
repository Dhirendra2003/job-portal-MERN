import { APPLICATION_END_POINT } from '@/utils/constants';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

// import { setAdminJobs } from '../../redux/adminJobSlice';
import { setAllApplications } from '../../redux/applicationsSlice';

export default function useGetAllApplications(id) {
  const [data,setData]=useState()
  const dispatch = useDispatch();
  useEffect(() => {

    const fetchAllApplications = async () => {
      try {
        const resp = await axios.get(`${APPLICATION_END_POINT}/${id}/applicants`, { withCredentials: true });
        if (resp.data.success) {
          dispatch(setAllApplications(resp.data.job.applications))
         setData(resp.data.job.applications);
        }
      } catch (error) {
        console.log(error)
      }
      return data
    }
    fetchAllApplications();
  }, [])
}
