import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    id: '',
    email: '',
    city: '',
    zipCode: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const cityOptions = ['New York', 'Los Angeles', 'Chicago', 'Houston'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation rules
  const validate = () => {
    const newErrors = {};
    console.log('Form Data:', formData);  

    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First name must not contain numbers or special characters.';
    }
    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last name must not contain numbers or special characters.';
    }
    if (!/^\d+$/.test(formData.id)) {
      newErrors.id = 'ID must be numeric only.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (formData.city === '') {
      newErrors.city = 'Please select a city.';
    }
    if (!/^\d+$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Zip Code must be numeric only.';
    }
    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(formData.username)) {
      newErrors.username = 'Username must not start with a number or special character and contain no spaces.';
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/.test(formData.password)) {
      newErrors.password = 'Password must be at least 10 characters long, contain one uppercase letter, one lowercase letter, and one digit.';
    }

    console.log('Validation Errors:', newErrors);  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(`Registration Successful!\nData: ${JSON.stringify(formData, null, 2)}`);
      setFormData({
        firstName: '',
        lastName: '',
        id: '',
        email: '',
        city: '',
        zipCode: '',
        username: '',
        password: '',
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>


          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-700">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-red-500 "
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-red-500"
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          </div>

          {/* ID */}
          <div className="mb-4">
            <label className="block text-gray-700">ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-red-500 "
            />
            {errors.id && <p className="text-red-500">{errors.id}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-red-500"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* City */}
          <div className="mb-4">
            <label className="block text-gray-700">City:</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-red-500"
            >
              <option value="">Select a city</option>
              {cityOptions.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-500">{errors.city}</p>}
          </div>

          {/* Zip Code */}
          <div className="mb-4">
            <label className="block text-gray-700">Zip Code:</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-red-500"
              style={{ display: 'block', visibility: 'visible' }}
            />
            {errors.zipCode && <p className="text-red-500">{errors.zipCode}</p>}
          </div>

           {/* Username */}
           <div className="mb-4">
            <label className="block text-gray-700">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-red-500 "
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </div>


           {/* Password */}
           <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-red-500"
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
