import React, {useEffect, useState} from 'react';
import "../assets/css/playlists.user.css"
import axios from "axios";

const PlaylistContainer = () => {
    const [user, setUser] = useState(null);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [newPlaylistType, setNewPlaylistType] = useState('public');

    useEffect(() => {
        const fetchUserPlaylists = async () => {
            const userData = localStorage.getItem('id');
            setUser(userData)
            console.log(userData)
            try {
                const response = await axios.get(`http://localhost:8000/api/playlist/by_user/${userData}/`);
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

    const handlePlaylistSubmit = async (event) => {
        const token = localStorage.getItem('jwt')
        event.preventDefault();

        const playlistData = {
            title: newPlaylistName,
            description: 'Awarage playlist info',
            is_public: newPlaylistType === 'public',
            owner: user
        };

        try {
            const response = await axios.post('http://localhost:8000/api/playlist/', playlistData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Replace 'your-access-token' with your actual access token
                }
            });
            console.log('Playlist created:', response.data);
            setUserPlaylists([...userPlaylists, response.data]);
            setNewPlaylistName('');
        } catch (error) {
            console.error('Error creating playlist:', error);
        }
    };

    return (
        <div className="playlist-container">
            <h2>My Playlists</h2>
            <div className="playlist-list">
                {userPlaylists.map((playlist) => (
                    playlist && (
                        <div key={playlist.id} style={playlistStyle} className="playlist">
                            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                            <div>
                                <h4>{playlist.title}</h4>
                                <h4>{playlist.description}</h4>
                            </div>
                        </div>
                    )
                ))}
            </div>
            <div className="add-playlist-form">
                <h3>Add Playlist</h3>
                <form action="#" onSubmit={handlePlaylistSubmit}>
                    <label>
                        <input type="text" name="playlist-name" placeholder="Playlist Name" value={newPlaylistName}
                               onChange={(e) => setNewPlaylistName(e.target.value)}
                                required />
                    </label>
                    <label htmlFor="playlist-type">Playlist Type:</label>
                    <select name="playlist-type" value={newPlaylistType} onChange={(e) => setNewPlaylistType(e.target.value)} id="playlist-type" required>
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
