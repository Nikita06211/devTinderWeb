import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
  console.log(user);
  const {firstName, lastName, photoUrl, age, gender, about, _id} = user;

  const dispatch = useDispatch();

  const handleSendRequest = async(status, userId)=>{
    try {
      const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId, {},{
        withCredentials: true,
      });
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-md">
        <figure>
          <img
            src={photoUrl}
            alt="Shoes" 
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName+" "+lastName}</h2>
          {age && gender && (<p>{age+", "+gender}</p>)}
          <p>{about}</p>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored", _id)}>Ignore</button>
            <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id )}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
