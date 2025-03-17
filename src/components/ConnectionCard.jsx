import React from 'react';

const ConnectionCard = ({ connection }) => {
  const { photoUrl, about, firstName, lastName, age, gender } = connection;

  return (
    <div className="flex justify-center"> {/* Centers the card */}
      <div className="card card-side bg-base-200 shadow-sm my-8 w-2/3 mx-auto">
        <figure>
          <img className="w-40 h-full" src={photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + ' ' + lastName}</h2>
          {age && gender &&<p className="text-bold text-xl text-left"> {age +" "+gender}</p>}
          <p className="text-bold text-left">{about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
