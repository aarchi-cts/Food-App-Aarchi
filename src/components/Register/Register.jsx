import React, { useState } from 'react';
 
export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'customer', // Default role
    });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({}); // State to store validation errors
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
 
        // Validate fields on change
        validateField(name, value);
    };
 
    const validateField = (name, value) => {
        let error = '';
        if (name === 'username') {
            const usernameRegex = /^[a-zA-Z0-9]+$/; // Only alphanumeric characters
            if (!usernameRegex.test(value)) {
                error = 'Username should not contain special characters.';
            }
        } else if (name === 'email') {
            if (!value.endsWith('@gmail.com')) {
                error = 'Email should end with @gmail.com.';
            }
        } else if (name === 'password') {
            if (value.length < 8) {
                error = 'Password should be at least 8 characters long.';
            }
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        // Check for errors before submitting
        const hasErrors = Object.values(errors).some((error) => error);
        if (hasErrors) {
            setMessage('Please fix the validation errors before submitting.');
            return;
        }
 
        try {
            const response = await fetch('https://localhost:7274/api/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
 
            if (response.ok) {
                setMessage('Registration successful!');
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Registration failed.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };
 
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="customer">Customer</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="agent">Agent</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-700 text-white py-2 rounded-lg hover:bg-orange-800"
                >
                    Register
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
}
 
// can you add profile icon so that role base user can use it to do there dashboard
 