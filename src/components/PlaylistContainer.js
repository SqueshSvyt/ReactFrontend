import React, {useEffect, useState} from 'react';
import "../assets/css/playlists.user.css"
import axios from "axios";

const PlaylistContainer = () => {
    const [user, setUser] = useState(null);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const userData = localStorage.getItem('user');
    setUser(userData)


    useEffect(() => {
        // Retrieve user data from localStorage
        const fetchUserPlaylists = async () => {
            const userData = localStorage.getItem('user');
            setUser(userData)

            try {
                const response = await axios.get(`http://localhost:8000/api/playlist/by_user/${user.id}/`);
                setUserPlaylists(response.data);
            } catch (error) {
                console.error('Error fetching user playlists:', error);
            }


        };

        fetchUserPlaylists().then(r => r);
    },
[]);

    const playlistStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    };

    return (
        <div className="playlist-container">
            <h2>My Playlists</h2>
            <div className="playlist-list">
                {/* Placeholder for user's playlists */}
                <div className="playlist-item">
                    <h3>My Favorite Songs</h3>
                    <p>Public Playlist</p>
                    <button className="add-music-button">Add Music</button>
                </div>
                <div className="playlist-item">
                    <h3>Workout Mix</h3>
                    <p>Private Playlist</p>
                    <button className="add-music-button">Add Music</button>
                </div>
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
            <div className="add-playlist-form">
                <h3>Add Playlist</h3>
                <form action="#" method="post">
                    <label>
                        <input type="text" name="playlist-name" placeholder="Playlist Name" required />
                    </label>
                    <label htmlFor="playlist-type">Playlist Type:</label>
                    <select name="playlist-type" id="playlist-type" required>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    <button type="submit">Create Playlist</button>
                </form>
            </div>
        </div>
    );
};

export default PlaylistContainer;
