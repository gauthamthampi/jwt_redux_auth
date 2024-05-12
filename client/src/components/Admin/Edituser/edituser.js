import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { url } from '../../../url';

function EditUser() {
  const { email } = useParams(); // Get the email parameter from URL
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/edituser/${email}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, [email]);

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3001/edituser/${email}`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        navigate('/adminhome', { state: { userEdited: true } });
      } else {
        console.error(response.data.message);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorMessage('Failed to update user');
    }
  };

  return (
    <div className="container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            type="text"
            onChange={handleInput}
            className="form-control"
            id="name"
            name="name"
            value={userData.name}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default EditUser;
