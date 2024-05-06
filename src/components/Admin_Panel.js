import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../assets/css/Admin.css"

const Admin = message => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        is_superuser: false,
        password: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${userId}/`);
            // After successful deletion, update the user list
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUser = (userId) => {
        setEditingUser(userId);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/users/', formData);
            console.log('User added:', res.data);
            window.location.reload();
        } catch (error) {
            console.error('Add user failed:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:8000/api/users/${editingUser}/`, formData);
            alert("User updated!")
            console.log('User updated:', res.data);
            window.location.reload();
        } catch (error) {
            alert('Update failed!')
            console.error('Update failed:', error);
        }
    };

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-item">
                        <div className="user-info">
                            <h2>Username: {user.username}</h2>
                            <p>Email: {user.email}</p>
                            <p>Superuser: {user.is_superuser ? 'Yes' : 'No'}</p>
                            <button className="edit-button" onClick={() => handleEditUser(user.id)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </div>
                        {editingUser === user.id && (
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="username" placeholder="Username" value={formData.username}
                                       onChange={handleChange}/>
                                <input type="email" name="email" placeholder="Email" value={formData.email}
                                       onChange={handleChange}/>
                                <input type="text" name="first_name" placeholder="First Name"
                                       value={formData.first_name} onChange={handleChange}/>
                                <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name}
                                       onChange={handleChange}/>
                                <input type="checkbox" name="is_superuser" checked={formData.is_superuser}
                                       onChange={handleChange}/>
                                <input type="password" name="password" placeholder="Password" value={formData.password}
                                       onChange={handleChange}/>
                                <button type="submit">Update</button>
                            </form>
                        )}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmitAdd}>
                <input type="text" name="username" placeholder="Username" value={formData.username}
                       onChange={handleChange}/>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
                <input type="text" name="first_name" placeholder="First Name" value={formData.first_name}
                       onChange={handleChange}/>
                <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name}
                       onChange={handleChange}/>
                <input type="checkbox" name="is_superuser" checked={formData.is_superuser} onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" value={formData.password}
                       onChange={handleChange}/>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default Admin;