import React, {useEffect, useState} from 'react';

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('user');
    console.log(userData)
    if (userData) {
      const parsedUser = JSON.parse(userData);
      // Set initial form data with user data
      setFormData({
        username: parsedUser.username,
        email: parsedUser.email,
        firstName: parsedUser.firstName || "", // Handle optional fields
        lastName: parsedUser.lastName || "", // Handle optional fields
      });
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    const userId = localStorage.getItem('id');
    event.preventDefault();
    // Make API call to edit profile
    fetch(`http://localhost:8000/api/users/${userId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to edit profile');
          }
          alert('Profile edited successfully!');
        })
        .catch(error => {
          console.error('Error editing profile:', error);
          alert('An error occurred while editing profile');
        });
  };

  return (
      <div style={styles.editProfileForm}>
        <h2 style={styles.heading}>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label style={styles.label} htmlFor="username">Username:</label>
            <input style={styles.input} type="text" id="username" name="username" value={formData.username}
                   onChange={handleChange} required/>
          </div>
          <div className="formGroup">
            <label style={styles.label} htmlFor="email">Email:</label>
            <input style={styles.input} type="email" id="email" name="email" value={formData.email}
                   onChange={handleChange} required/>
          </div>
          <div className="formGroup">
            <label style={styles.label} htmlFor="firstName">First Name:</label>
            <input style={styles.input} type="text" id="firstName" name="firstName" value={formData.firstName}
                   onChange={handleChange}/>
          </div>
          <div className="formGroup">
            <label style={styles.label} htmlFor="lastName">Last Name:</label>
            <input style={styles.input} type="text" id="lastName" name="lastName" value={formData.lastName}
                   onChange={handleChange}/>
          </div>
          <button type="submit" style={styles.saveButton}>Save Changes</button>
        </form>
      </div>
  );
};

export default EditProfileForm;

const styles = {
  editProfileForm: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    marginTop: '0',
    fontSize: '1.5rem',
    color: '#333',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    height: '100px',
    resize: 'vertical',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    textDecoration: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
