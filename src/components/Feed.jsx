import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed.length > 0) return;  // Avoid fetching if feed already exists
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Prevent rendering if feed is empty or undefined
  if (!feed || feed.length === 0) {
    return <p>Loading...</p>; 
  }

  return (
    <>
      <div className="flex justify-center mb-20 mt-3">
        <UserCard user={feed[0]} />
      </div>
    </>
  );
};

export default Feed;
