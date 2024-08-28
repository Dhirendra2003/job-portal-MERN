import { JOB_END_POINT } from '@/utils/constants';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setJobDetails } from '../../redux/singleJobSlice';

export default function useGetJobDetails(id) {
  // const dispatch = useDispatch();
  // const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        console.log(`${JOB_END_POINT}/get/${id} this is from custom hook`);
        const resp = await axios.get(`${JOB_END_POINT}/get/${id}`, { withCredentials: true });
        if (resp.data.success) {
          dispatch(setJobDetails(resp.data.job));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  return {  loading };
}