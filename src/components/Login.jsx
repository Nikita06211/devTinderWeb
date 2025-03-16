import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = useState("gray@gmail.com");
    const [password, setPassword] = useState("Gray@123");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async() => {
        try{
          const user = await axios.post(BASE_URL+"/login",{
            emailId,
            password
          },
          { withCredentials: true }
        );
        dispatch(addUser(user.data));
        return navigate("/");
        }catch(err){
          setError(err?.response?.data|| "Something went wrong");
          console.error(err);
        }
    }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <div>
                <fieldset className="fieldset" >
                    <legend className="fieldset-legend">Email ID</legend>
                    <input type="text" className="input" placeholder="Type here" value={emailId} onChange={(e)=> setEmailId(e.target.value)} />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input type="text" className="input" placeholder="Type here" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </fieldset>
                <p className='text-red-600 text-s my-2'>{error}</p>
            </div>
            <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
        </div>
       </div>
    </div>
  )
}

export default Login
