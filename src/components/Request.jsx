import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../utils/requestSlice';
import RequestCard from './RequestCard';

const Request = () => {
    
    const dispatch = useDispatch();
    const requests = useSelector((store)=>store.requests);
    const fetchRequest = async()=>{
        try{

            const res = await axios.get(BASE_URL+"/user/requests/received",{
                withCredentials:true,
            });
            console.log(res.data.data);
            dispatch(addRequest(res.data.data));

        }catch(err){
            console.error(err.message);
        }
    };

    useEffect(()=>{
        fetchRequest();
    },[]);
    // console.log(requests);

    if(!requests) return;

    if(requests.length === 0) return <h1>No Requests Found</h1>


  return (
    <div className="text-center my-8">
      <h1 className="font-bold text-2xl my-4">Requests</h1>
      {/* Grid Container */}  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {requests.map((request) => (
          <RequestCard key={request._id} request={request} />
        ))}
      </div>
    </div>
  )
}

export default Request;
