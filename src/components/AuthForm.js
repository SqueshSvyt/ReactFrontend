import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import "../assets/css/form.css"

const AuthForm = () => {
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmitLogIn = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/login/', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('jwt', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                login();
                window.location.href = '/';
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div id="container">
            <div className="form-container sign-in-container">
                <form id="loginForm" onSubmit={handleFormSubmitLogIn}>
                    <h1>Sign in</h1>
                    <input type="text" name="username" placeholder="Username" value={formData.email}
                           onChange={handleInputChange}/>
                    <input type="password" name="password" placeholder="Password" value={formData.password}
                           onChange={handleInputChange}/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
