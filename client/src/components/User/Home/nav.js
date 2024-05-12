import React from 'react';
import { useDispatch } from 'react-redux';
import "./nav.css"
import { logout } from '../../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Nav() {
  const userDetails = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to the login page or another appropriate page
  };

  return (
    <div className='home'>
      <div className='navbar'>
        <nav>
          <a href="/profile">Profile</a>
          <a onClick={handleLogout}>Logout</a>
        </nav>
      </div>
      <div className='heading'>
        {userDetails && (
          <h1>Welcome, {userDetails.name}!</h1>
        )}
      </div>
    </div>
  );
}

export default Nav;
