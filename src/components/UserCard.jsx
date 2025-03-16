import React from 'react';

const UserCard = ({user}) => {
  console.log(user);
  const {firstName, lastName, photoUrl, age, gender, about} = user;
  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-md">
        <figure>
          <img
            src={user.photoUrl}
            alt="Shoes" 
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName+" "+lastName}</h2>
          {age && gender(<p>{age+", "+gender}</p>)}
          <p>{about}</p>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
