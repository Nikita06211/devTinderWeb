import React from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../utils/requestSlice';

const RequestCard = ({ request }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
  const reviewRequest = async(status,_id)=>{
    try {
        
        const res = axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{
            withCredentials:true,
        });
        dispatch(removeRequest(_id));

    } catch (error) {
        console.error(error.message);
    }
}
  return (
    <div className='flex justify-center'>
      <div className="card bg-base-200 shadow-md my-4 w-70 mx-auto p-4 rounded-lg">
        <figure className="flex justify-center">
          <img className="w-50 h-50 rounded-lg object-cover" src={photoUrl} alt="photo" />
        </figure>
        <div className="card-body text-center p-3">
          <h2 className="card-title text-lg justify-center">{firstName + " " + lastName}</h2>
          {age && gender && <p className="text-sm  text-gray-600">{age + ", " + gender}</p>}
          <p className="text-xs text-gray-500">{about}</p>
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-s btn-primary w-1/3 px-3 mx-1" onClick={()=>reviewRequest("rejected",request._id)}>Delete</button>
            <button className="btn btn-s btn-secondary w-1/3 px-3 mx-1" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
