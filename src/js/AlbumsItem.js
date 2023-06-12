import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/albumItem.css";

function AlbumsItem() {
  const [photos, setPhotos] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const { username, id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  if(user.username !== username) {
    navigate(`users/${user.username}/albums/${id}/photos`)
  }

  useEffect(() => {
    fetch(`http://localhost:3001/api/albums/${id}/photos`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const handleLoadMore = () => {
    setStart(start);
    setEnd(end + 10);
  };

  const handleBackClick = () => {
    navigate(`/users/${username}/albums`);
  };

  return (
    <div className="photo-list-container">
      <button className="view-comments-button" onClick={handleBackClick}>
        Back to Albums
      </button>
      {photos.length > 0 ? (
        <div className="photo-list">
          {photos.slice(start, end).map((photo) => (
            <img
              key={photo.id}
              src={photo.thumbnailUrl}
              alt={photo.title}
              className="photo-item"
            />
          ))}
        </div>
      ) : (
        <p className="loading-message">No photos found.</p>
      )}
      {end < photos.length && (
        <div className="load-more">
          <button onClick={handleLoadMore} className="load-more-button">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default AlbumsItem;
