import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSet, setLogin] = useState(sessionStorage.getItem('logged') === '1');

  function check() {
    if (username.trim() === 'admin' && password.trim() === 'password') {
      sessionStorage.setItem('logged', '1');
      setLogin(true);
      navigate('/');
    }
  }

  function logout() {
    sessionStorage.setItem('logged', '0');
    setLogin(false);
    navigate('/login');
  }

  return (
    <nav className="bg-yellow-800 text-black p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold hover:text-gray-300">
            Ethan's Mini Project
          </Link>
        </div>

        
        <div className="flex items-center space-x-4">
          {loginSet ? (
            <>
              <span>Welcome!</span>
              <button
                onClick={logout}
                className="hover:text-gray-300 focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
