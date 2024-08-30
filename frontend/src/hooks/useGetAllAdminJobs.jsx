import { JOB_END_POINT } from '@/utils/constants';
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { setAdminJobs } from '../../redux/adminJobSlice';

export default function useGetAllAdminJobs() {
  const dispatch = useDispatch();
  useEffect(() => {

    const fetchAdminJobs = async () => {
      try {
        const resp = await axios.get(`${JOB_END_POINT}/getadminjobs`, { withCredentials: true });
        if (resp.data.success) {
          dispatch(setAdminJobs(resp.data.jobs))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAdminJobs();
  }, [])
}
