import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
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

    const handleSignUp = async()=>{
      try {
        const res = await axios.post(BASE_URL+"/signup",{
          emailId,
          password,
          firstName,
          lastName,
        },
        {
          withCredentials: true,
        })
        dispatch(addUser(res.data.data));
        return navigate("/profile");
      } catch (error) {
          console.error(error.message);
      }
    }

  return (
    <div className='flex justify-center mb-20 mt-10 h-fit'>
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
            <h2 className="card-title justify-center">{isLoginForm?"Login":"Sign Up"}</h2>
            <div>
                <fieldset className="fieldset" >
                    <legend className="fieldset-legend">Email ID</legend>
                    <input type="text" className="input" placeholder="Type here" value={emailId} onChange={(e)=> setEmailId(e.target.value)} />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input type="text" className="input" placeholder="Type here" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </fieldset>
                {!isLoginForm && 
                <>
                  <fieldset className="fieldset" >
                      <legend className="fieldset-legend">First Name</legend>
                      <input type="text" className="input" placeholder="Type here" value={firstName} onChange={(e)=> setFirstName(e.target.value)} />
                  </fieldset>
                  <fieldset className="fieldset">
                      <legend className="fieldset-legend">Last Name</legend>
                      <input type="text" className="input" placeholder="Type here" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                  </fieldset>
                </>}
                <p className='text-red-600 text-s my-2'>{error}</p>
            </div>
            <div className="card-actions justify-center">
            <div className="relative w-26 h-12 flex items-center bg-gray-300 rounded-4xl  cursor-pointer" onClick={() => setIsLoginForm(!isLoginForm)}>
              <div className={`absolute h-12 bg-primary rounded-4xl shadow-md transition-transform  ${isLoginForm ? "translate-x-0 w-16 " : "translate-x-14 w-20 "}`}></div>
                <span className={`absolute text-white left-2 text-sm font-semibold`} onClick={emailId && password ? ()=>handleLogin(): undefined}>
                  {isLoginForm ? "Login" : ""}
                </span>
                <span className="absolute -right-4 text-white text-sm font-semibold" onClick={ () => handleSignUp() }>
                  {!isLoginForm ? "Sign Up" : ""}
                </span>
              </div>   
              
            </div>
            <p 
                className="text-sm text-blue-600 underline cursor-pointer justify-center text-center" 
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                {isLoginForm ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </p> 
        </div>
       </div>
    </div>
  )
}

export default Login
