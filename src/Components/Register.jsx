import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userId: '',
    email: '',
    city: '',
    zipCode: '',
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const cities = ['New York', 'Greenwood', 'Chicago', 'Charlotte']; 

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    const usernamePattern = /^[A-Za-z][A-Za-z0-9_]*$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;

    if (/\d/.test(formData.firstName)) {
      newErrors.firstName = 'First name must not contain numbers';
    }
    if (/\d/.test(formData.lastName)) {
      newErrors.lastName = 'Last name must not contain numbers';
    }
    if (!/^\d+$/.test(formData.userId)) {
      newErrors.userId = 'ID must be numeric only';
    }
    if (!formData.email.includes('@') || !formData.email.includes('.') || formData.email.indexOf('@') > formData.email.lastIndexOf('.')) {
      newErrors.email = 'Invalid email format';
    }
    if (!/^\d+$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Zip code must be numeric only';
    }
    if (/\s/.test(formData.username) || !usernamePattern.test(formData.username)) {
      newErrors.username = 'Username must not contain spaces and must start with a letter';
    }
    if (!passwordPattern.test(formData.password)) {
      newErrors.password = 'Password must be 10+ chars, include uppercase, lowercase, and digit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('User registered successfully!');
        setFormData({
          firstName: '', lastName: '', userId: '',
          email: '', city: '', zipCode: '',
          username: '', password: ''
        });
        setErrors({});
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Register Error:', error);
      alert('Server error');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['firstName', 'lastName', 'userId', 'email', 'zipCode', 'username', 'password'].map((field) => (
          <div key={field}>
            <input
              type={field === 'password' ? 'password' : field === 'userId' || field === 'zipCode' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field[0].toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              className="w-full border p-2 rounded"
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}

        <div>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
