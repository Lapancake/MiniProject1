import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInMessage, setLoggedInMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      alert('Both fields are required.');
      return;
    }

    try {
      const response = await fetch('https://your-vercel-project-url/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('logged', '1');
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('isAdmin', data.isAdmin ? 'true' : 'false');
        setLoggedInMessage(`Logged in as ${data.username}`);
        setTimeout(() => navigate('/'), 1500); 
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {loggedInMessage ? (
          <p className="text-green-600 font-semibold text-center">{loggedInMessage}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
