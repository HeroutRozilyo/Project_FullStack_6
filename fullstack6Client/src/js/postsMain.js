import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "../css/posts.css"; // import the CSS file

function Posts() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log(error));
  }, []);

  const handlePostClick = (postId) => {
    if (selectedPost === postId) {
      setSelectedPost(null);
      setShowComments(false);
    } else {
      setSelectedPost(postId);
      setShowComments(false);
    }
  };

  const handleViewCommentsClick = (postId) => {
    navigate(`${postId}/comments`);
  };

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <div
            key={post.id}
            className={`post-container ${
              selectedPost === post.id ? "post-container-active" : ""
            }`}
            onClick={() => handlePostClick(post.id)}
          >
            <div className="post-header">
              <h2 className="post-title">{post.title}</h2>
              {selectedPost === post.id && (
                <>
                  <p className="caption">{post.body}</p>
                  <button
                    className="view-comments-button"
                    onClick={() => handleViewCommentsClick(post.id)}
                  >
                    View Comments
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}

export default Posts;