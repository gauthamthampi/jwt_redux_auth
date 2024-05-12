import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../../../url';
import { useNavigate } from 'react-router-dom';


function Adduser() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
      });
      const [errorMessage, setErrorMessage] = useState('');

      const handleInput = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(url.adduserAdm, userData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (response.status === 201) {
            navigate('/adminhome', { state: { userAdded: true } }); // Navigate to login with state
          } else {
            console.error(response.data.message);
            setErrorMessage(response.data.message);
          }
        } catch (error) {
          console.error('Error passing data:', error);
          setErrorMessage('Process failed');
        }
      };
      

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card" style={{ width: "500px",padding : "10px" }}>
        <h2 className="text-center mb-4">Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Username</label>
            <input type="text" onChange={handleInput} className="form-control" id="email" name="name" placeholder="Enter your name" required  />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" onChange={handleInput} className="form-control" id="email" name="email" placeholder="Enter your email id" required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" onChange={handleInput} className="form-control" id="password" name="password" placeholder="Enter your password" required />
          </div>

          <button type="submit" className="btn btn-primary d-block mx-auto">Add User</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>

        {/* Back to home link */}
        <div className="switch text-center mt-3">
          <a href="/adminhome">Back to Home</a>
        </div>
      </div>
    </div>
  );
}

export default Adduser;
