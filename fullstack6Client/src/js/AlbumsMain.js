import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "../css/album.css";
import { Navigate, Link } from "react-router-dom";
import image from '../Image/galery.png'

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  useEffect(() => {
    try {
      fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => setAlbums(data));
    } catch (error) {
      console.log(error);
    }
  }, [userId]);
  

  return (
    <div>
      <div className="album-container">
       
        <ul className="album-list">
          {albums.map((album) => (
            <Link
              to={`${album.id}/photos`}
              key={album.id}
              className="album-card"
            >
              <div className="album-image">
                <img src={image} alt={album.title} />
                <span className="album-title-text">{album.title}</span>
              </div>
            </Link>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default Albums;
