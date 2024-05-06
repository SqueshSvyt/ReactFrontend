import React, { useEffect, useState } from 'react';
import "../assets/css/main.page.style.css"
import NoImage from "../assets/images/No_image.jpg"

const HomePage = () => {

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/playlist/all/public/', {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    console.log('Network response was not ok');
                }

                const data = await response.json();
                const playlistsData = data.map(item => ({
                    imgSrc: NoImage,
                    title: item.title,
                    description: item.description
                }));
                setPlaylists(playlistsData);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchPlaylists().then(r => r);
    }, []);

    return (
        <div className="container">
            <h2>Most Popular Playlists</h2>
            <hr/>
            <div className="row">
                {playlists.map((playlist, index) => (
                    <div key={index} className="playlist-col" >
                        <div className="playlist">
                            <img src={playlist.imgSrc} alt={playlist.title}/>
                            <h4>{playlist.title}</h4>
                            <p>{playlist.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
