import React, { useEffect,useState } from 'react';
import './login.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { url } from '../../../url';
import { setuserDetails } from '../../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromSignup = location.state && location.state.fromSignup;

  useEffect(() => {
    if (fromSignup) {
      toast.success('Account created successfully. Please log in.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  }, [fromSignup]);
  
  const handleSignup = () => {
    navigate('/signup');
  };

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url.postLogin, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        dispatch(setuserDetails(response.data.user)) // Store token in local storage
        navigate('/home'); 
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Internal server error');
    }
  }

  return (
    <div className="loginpage">
      <ToastContainer />
    <div className="main" >
      <input type="checkbox" id="chk" aria-hidden="true" />
      
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <label className='labeluserlog' htmlFor="chk">Log in</label>
          <input className='inputuserlog' onChange={handleInput} type="email" name="email" placeholder="Email" required />
          <input  className='inputuserlog' onChange={handleInput} type="password" name="password" placeholder="Password" required />
          <button className='buttonuserlog' type="submit">Submit</button>
          {error && <p className="error-message">{error}</p>}
        </form>
          <p className='puserlog' >Don't have an account?<i onClick={handleSignup} > Sign up</i></p>
      </div>

     
    </div>
    </div>
  );
}

export default Login;
