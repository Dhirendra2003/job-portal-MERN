import { JOB_END_POINT } from '@/utils/constants';
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAllJobs } from '../../redux/jobSlice';
import { toast } from 'sonner';

export default function useGetAllJobs() {
  const dispatch = useDispatch();
  useEffect(() => {

    const fetchAllJobs = async () => {
      try {
        const resp = await axios.get(`${JOB_END_POINT}/get`, { withCredentials: true });
        if (resp.data.success) {
          dispatch(setAllJobs(resp.data.jobs))
        }
      } catch (error) {
        console.log(error)
        toast.warning(error.response.data.message +" please login again")
      }
    }
    fetchAllJobs();
  }, [])
}
