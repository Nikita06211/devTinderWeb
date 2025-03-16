import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName );
  const [lastName, setLastName] = useState(user?.lastName );
  const [age, setAge] = useState(user?.age );
  const [gender, setGender] = useState(user?.gender );
  const [about, setAbout] = useState(user?.about );
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [error, setError] = useState("");
  const [showToast,setShowToast] = useState(false);
  const dispatch = useDispatch();
    const saveProfile = async()=>{
        try{
            const res = await axios.patch(BASE_URL+"/profile/edit",
                {
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                },
                {
                    withCredentials:true
                }
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }catch(err){
            setError(err.response?.data?.message || "Profile update failed");
        }
    }

  return user && (
    <>
        <div className='flex justify-center my-10'>
        <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex justify-center items-center mx-10">
        <div className="card bg-base-200 w-96 shadow-lg">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input type="text" className="input" placeholder="Type here" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input type="text" className="input" placeholder="Type here" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input type="text" className="input" placeholder="Type here" value={age} onChange={(e) => setAge(e.target.value)} />
              </fieldset>
              <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <div className="dropdown dropdown-center">
                <div tabIndex={0} role="button" className="btn m-1">
                {gender ? gender : "Select Gender ⬇️"}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
                <li><a onClick={() => setGender("Male")}>Male</a></li>
                <li><a onClick={() => setGender("Female")}>Female</a></li>
                <li><a onClick={() => setGender("Others")}>Others</a></li>
                </ul>
              </div>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input type="text" className="input" placeholder="Type here" value={about} onChange={(e) => setAbout(e.target.value)} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL</legend>
                <input type="text" className="input" placeholder="Type here" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
              </fieldset>
            </div>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
            </div>
          </div>
        </div>
      </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, about, age, gender  }}
        />
        </div>
        {showToast && (
            <div className="toast toast-top toast-center">
                <div className="alert alert-info">
                    <span>Profile updated successfully</span>
                </div>
            </div>
        )}
        <footer className="bg-gray-800 text-white text-center p-4">
        © 2025 DevTinder. All rights reserved.
      </footer>
    </>
    

  );
};

export default EditProfile;
