import React, { useState } from 'react';
import './admlogin.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    setUsername('');
    setPassword('');
  };

  return (
    <div className='admlogin'>
      <div className='containeradmlog'>
        <div className='cardadmlog'>
          <h2 className='h2admlog'>Admin Login</h2>
          <form className='formadmlog' onSubmit={handleSubmit}>
            <input
              className='inputadmlog'
              type='text'
              id='username'
              name='username'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className='inputadmlog'
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className='buttonadmlog' type='submit'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
