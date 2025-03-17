import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';
import ConnectionCard from './ConnectionCard';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connections);
    const fetchConnections = async ()=>{
        try{
            const res = await axios.get(BASE_URL+"/user/connections",{
                withCredentials:true,
            });

            console.log(res?.data?.data);
            dispatch(addConnections(res.data.data));

        }catch(err){
            console.error(err.message);
        }
    }
    useEffect(()=>{
        fetchConnections();
    },[]);
    if(!connections) return;

    if(connections.length === 0) return <h1>No Connections Found</h1>

  return (
    <div className='text-center justify-center my-18'>
      <h1 className='font-bold text-2xl my-10'>Connections</h1>
      {connections.map((connection)=> {
        // const {firstName, lastName, photoUrl, age, gender, about} = connection;
        return (
        <div key = {connection._id}>
            <ConnectionCard connection = {connection} className="my-10 mx-5"/>
        </div>
      )})}
    </div>
  )
}

export default Connections
