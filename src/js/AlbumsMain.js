import React, { useState, useEffect } from "react";
import { Outlet, useParams, Link } from "react-router-dom";
import "../css/album.css";
import image from '../Image/galery.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSave, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [creatingAlbum, setCreatingAlbum] = useState(false);
  const { albumId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  useEffect(() => {
    try {
      fetch(`http://localhost:3001/api/users/${userId}/albums`)
        .then((response) => response.json())
        .then((data) => setAlbums(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleTitleUpdate = async (albumId) => {
    try {
      const res = await fetch(`http://localhost:3001/api/albums/${albumId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: updatedTitle }),
      });

      if (res.ok) {
        // Update the album title in the UI
        const updatedAlbums = albums.map((album) => {
          if (album.id === albumId) {
            return { ...album, title: updatedTitle };
          }
          return album;
        });
        setAlbums(updatedAlbums);
        setUpdatedTitle("");
        setSelectedAlbum(null); // Clear the selected album after updating the title
      } else {
        throw new Error("Failed to update album title");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditAlbumTitle = (albumId, currentTitle) => {
    setSelectedAlbum(albumId);
    setUpdatedTitle(currentTitle);
  };

  const handleCancelEdit = () => {
    setSelectedAlbum(null);
    setUpdatedTitle("");
  };

  const handleCreateAlbum = () => {
    setCreatingAlbum(true);
  };

  // ...

const handleAddAlbum = async () => {
  try {
    const res = await fetch(`http://localhost:3001/api/albums`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: updatedTitle || "New Album", userId }),
    });

    if (res.ok) {
      const res = await fetch(`http://localhost:3001/api/users/${userId}/albums/maxId`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

if (res.ok) {
  const newAlbum = await res.json();
  console.log(newAlbum);
  setAlbums([...albums, newAlbum]);
      setUpdatedTitle(newAlbum.title); // Update the title to the new album's title
      setCreatingAlbum(false);


} else {
  console.log("Failed to fetch album with max ID");
}
      
      
    } else {
      throw new Error("Failed to create album");
    }
  } catch (error) {
    console.log(error);
  }
};

// ...

  
  
  

  const handleCancelCreate = () => {
    setCreatingAlbum(false);
    setUpdatedTitle("");
  };

  return (
    <div>
      <div className="album-container">
        <ul className="album-list">
          {albums.map((album) => (
            <div key={album.id} className="album-card">
               <Link
              to={`${album.id}/photos`}
              key={album.id}
              className="album-image"
            >
                <img src={image} alt={album.title} />
                <span className="album-title-text">
                  {album.id === selectedAlbum ? (
                    <input
                      type="text"
                      value={updatedTitle}
                      onChange={handleTitleChange}
                    />
                  ) : (
                    album.title
                  )}
                </span>
              </Link>
              <div className="album-actions">
                {album.id === selectedAlbum ? (
                  <>
                    <button onClick={() => handleTitleUpdate(album.id)}>
                      <FontAwesomeIcon icon={faSave} className="save-icon" />
                    </button>
                    <button onClick={handleCancelEdit}>
                      <FontAwesomeIcon icon={faTimes} className="cancel-icon" />
                    </button>
                  </>
                ) : (
                  <FontAwesomeIcon
                    icon={faPen}
                    className="edit-icon"
                    onClick={() => handleEditAlbumTitle(album.id, album.title)}
                  />
                )}
              </div>
            </div>
          ))}
        {creatingAlbum ? (
  <div className="album-card">
    <div className="album-image">
      <input
        type="text"
        value={updatedTitle}
        onChange={handleTitleChange}
        placeholder="Enter album title"
      />
      <div className="album-action-buttons">
        <button onClick={handleAddAlbum}>
          <FontAwesomeIcon icon={faSave} className="save-icon" />
        </button>
        <button onClick={handleCancelCreate}>
          <FontAwesomeIcon icon={faTimes} className="cancel-icon" />
        </button>
      </div>
    </div>
  </div>
) : (
  <div className="album-card">
    <div className="album-image">
      <FontAwesomeIcon
        icon={faPlus}
        className="add-icon"
        onClick={handleCreateAlbum}
      />
      <span className="album-title-text">Create Album</span>
    </div>
  </div>
)}

        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default Albums;
