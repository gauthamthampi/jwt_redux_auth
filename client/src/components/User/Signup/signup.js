import React, { useState } from 'react';
import '../Login/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../../url';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url.saveUser, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        toast.success('Account created successfully. Please log in.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        navigate('/login', { state: { fromSignup: true } }); // Navigate to login with state
      } else {
        setError(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error passing data:', error);
      setError(true);
      setErrorMessage('Signup failed');
    }
  };

  return (
    <div className="loginpage">
      <div className="main">
        <div className="signup">
          <form onSubmit={handleSubmit}>
            <label className='labeluserlog' htmlFor="chk">Sign up</label>
            <input className='inputuserlog' type="text" name="name" onChange={handleInput} placeholder="User name" required />
            <input className='inputuserlog' type="email" name="email" onChange={handleInput} placeholder="Email" required />
            <input className='inputuserlog' type="password" name="password" onChange={handleInput} placeholder="Password" required />
            <button className='buttonuserlog' type="submit">Sign up</button>
          </form>
          {error && <p className="error-message">{errorMessage}</p>}
          <p className='puserlog' >
            Already a member?<i className='i' onClick={handleLogin}>Log in</i>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
