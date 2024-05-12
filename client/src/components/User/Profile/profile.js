import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import { url } from '../../../url';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  // Retrieve user email from Redux state
  const userEmail = useSelector((state)=> state.user.userDetails)

  useEffect(() => {
    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail]); // Fetch user data when userEmail changes

  const fetchUserData = async () => {
    try {
      // Fetch user data based on user email
      const response = await axios.get(`${url.getuserbyEmail}/${userEmail.email}`); // Assuming backend route to fetch user by email
      const userData = response.data;

      setName(userData.name);
      setImage(userData.image); 
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      setErrorMessage('Failed to fetch user data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (image) {
        formData.append('image', image);
      }
  
      await axios.put(`${url.updateuser}/${userEmail.email}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Redirect to home page after successful submission
      navigate('/home');
    } catch (error) {
      console.error('Error updating user data:', error.message);
      setErrorMessage('Failed to update user data');
    }
  };
  
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card" style={{ width: '500px', padding: '10px' }}>
        <h2 className="text-center mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <img alt="Profile" width="200px" height="200px" src={image || ''} />
          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button type="submit" className="btn btn-primary d-block mx-auto">
            Save
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        {/* Back to home link */}
        <div className="switch text-center mt-3">
          <a href="/home">Back to Home</a>
        </div>
      </div>
    </div>
  );
}

export default Profile;
