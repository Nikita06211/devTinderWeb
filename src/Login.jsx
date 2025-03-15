import React, { useState } from 'react';
import axios from "axios";

const Login = () => {

    const [emailId, setEmailId] = useState("gray@gmail.com");
    const [password, setPassword] = useState("Gray@123");

    const handleLogin = async() => {
        try{
          const res = await axios.post("http://localhost:3001/login",{
            emailId,
            password
          },
          { withCredentials: true }
        );
        }catch(err){
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
