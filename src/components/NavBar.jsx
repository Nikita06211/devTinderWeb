import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const user = useSelector((store) => store.user);

  return (
    <div>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          {/* ✅ Redirects to login if not logged in */}
          <Link to={user ? "/" : "/login"} className="btn btn-ghost text-xl">
            DevTinder
          </Link>
        </div>
        {user && (
          <div className="flex gap-2">
            <div className="dropdown dropdown-end mx-5">
              Welcome, {user.firstName}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-2.5"
              >
                <div className="w-10 rounded-full">
                  <img alt="User Avatar" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
