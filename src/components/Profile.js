import React, {useEffect, useState} from 'react';
import creator1Image from "../assets/images/Creator1.jfif"
import axios from "axios";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('user');

    // If user data exists, parse it and set the user state
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }

    const fetchUserPlaylists = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/playlist/by_user/${user.id}/`);
        setUserPlaylists(response.data);
      } catch (error) {
        console.error('Error fetching user playlists:', error);
      }
    };

    fetchUserPlaylists().then(r => r);
  }, []);


  const profileCardStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  };

  const profilePictureStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '10px 10px 0 0',
  };

  const profileDetailsStyle = {
    padding: '20px',
  };

  const h2Style = {
    marginTop: '0',
    fontSize: '1.5rem',
    color: '#333',
  };

  const pStyle = {
    margin: '10px 0',
    fontSize: '1rem',
    color: '#666',
  };

  const boldPStyle = {
    ...pStyle,
    fontWeight: 'bold',
  };

  const musicPreferencesStyle = {
    marginTop: '20px',
  };

  const h3Style = {
    fontSize: '1.25rem',
    marginBottom: '10px',
  };

  const ulStyle = {
    listStyleType: 'none',
    padding: '0',
  };

  const liStyle = {
    display: 'inline-block',
    marginRight: '10px',
    backgroundColor: '#ddd',
    padding: '5px 10px',
    borderRadius: '5px',
  };

  const playlistSectionStyle = {
    marginTop: '20px',
  };

  const playlistStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  };

  // const playlistImgStyle = {
  //   width: '100px',
  //   height: '100px',
  //   borderRadius: '5px',
  //   marginRight: '15px',
  // };

  const editButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const handleMouseEnter = (event) => {
    event.target.style.backgroundColor = '#0056b3';
  };

  const handleMouseLeave = (event) => {
    event.target.style.backgroundColor = '#007bff';
  };

  return (
      <div style={profileCardStyle} className="profile-card">
        {user && (
            <>
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img src={creator1Image} alt="Profile Picture" style={profilePictureStyle} />
              <div style={profileDetailsStyle} className="profile-details">
                <h2 style={h2Style}>{user.username}</h2>
                <p style={boldPStyle}>Email: {user.email}</p>
                <div style={musicPreferencesStyle} className="music-preferences">
                  <h3 style={h3Style}>Favorite Genres</h3>
                  <ul style={ulStyle}>
                    <li style={liStyle}>Pop</li>
                    <li style={liStyle}>Rock</li>
                    <li style={liStyle}>Hip Hop</li>
                  </ul>
                </div>
                <div style={playlistSectionStyle} id="playlistsContainerProfile" className="playlist-section">
                  <h3 style={h3Style}>My Playlists</h3>
                  {userPlaylists.map((playlist) => (
                      playlist && (
                          <div key={playlist.id} style={playlistStyle} className="playlist">
                            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                            <div>
                              <h4>{playlist.name}</h4>
                              <h4>{playlist.description}</h4>
                            </div>
                          </div>
                      )
                  ))}
                </div>
                <a
                    href="./edit_profile"
                    style={editButtonStyle}
                    className="edit-button"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                  Edit Profile
                </a>
              </div>
            </>
        )}
      </div>
  );
};

export default ProfileCard;
