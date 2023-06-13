import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import "../css/posts.css";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const editFormRef = useRef(null);

  useEffect(() => {
    const userId = user.id;
    setIsLoading(true);

    fetch(`http://localhost:3001/api/users/${userId}/posts`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
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

  const handleNewPostSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      userId: user.id,
      title: newPostTitle,
      body: newPostBody,
    };

    setIsLoading(true);

    fetch("http://localhost:3001/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        fetch(`http://localhost:3001/api/users/${user.id}/posts`)
          .then((response) => response.json())
          .then((data) => {
            setPosts(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });

        setNewPostTitle("");
        setNewPostBody("");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleDeletePost = (postId) => {
    setIsLoading(true);

    fetch(`http://localhost:3001/api/posts/${postId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        fetch(`http://localhost:3001/api/users/${user.id}/posts`)
          .then((response) => response.json())
          .then((data) => {
            setPosts(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleEditPost = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    if (postToEdit) {
      setNewPostTitle(postToEdit.title);
      setNewPostBody(postToEdit.body);
      setIsEditMode(true);
      setScrollPosition(window.scrollY);
      window.scrollTo(0, 0); // Scroll to top of the page
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setSelectedPost(null);
    setShowComments(false);
    setNewPostBody("");
    setNewPostTitle("");
    window.scrollTo(0, scrollPosition); // Scroll back to the previous position
  };

  const handleSavePost = (postId) => {
    // Update the post in the database
    setIsLoading(true);

    const updatedPost = {
      title: newPostTitle,
      body: newPostBody,
    };

    fetch(`http://localhost:3001/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setIsEditMode(false);

        // Refresh the posts list
        fetch(`http://localhost:3001/api/users/${user.id}/posts`)
          .then((response) => response.json())
          .then((data) => {
            setPosts(data);
            window.scrollTo(0, scrollPosition); 
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="new-post-container">
        {!isEditMode ? (
          <>
            <h2>Add New Post</h2>
            <form onSubmit={handleNewPostSubmit}>
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Title"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <textarea
                  placeholder="Body"
                  value={newPostBody}
                  onChange={(e) => setNewPostBody(e.target.value)}
                ></textarea>
                <button type="submit">Create Post</button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2>Edit Post</h2>
            <form ref={editFormRef}>
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Title"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <textarea
                  placeholder="Body"
                  value={newPostBody}
                  onChange={(e) => setNewPostBody(e.target.value)}
                ></textarea>
                <div className="edit-buttons">
                  <button className="save-button" onClick={() => handleSavePost(selectedPost)}>
                    <AiOutlineSave /> 
                  </button>
                  <button className="cancel-button" onClick={handleCancelEdit}>
                    <AiOutlineClose />
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
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
              {!isEditMode && (
                <>
                  <div className="post-actions">
                    <div className="edit-delete-buttons">
                      <button className="edit-button" onClick={() => handleEditPost(post.id)}>
                        <AiOutlineEdit />
                        Edit
                      </button>
                      <button className="delete-post-button" onClick={() => handleDeletePost(post.id)}>
                        <AiOutlineDelete />
                        Delete 
                      </button>
                    </div>
                  </div>
                  {selectedPost === post.id && (
                    <>
                      <p className="post-body">{post.body}</p>
                      <button
                        className="view-comments-button"
                        onClick={() => handleViewCommentsClick(post.id)}
                      >
                        View Comments
                      </button>
                    </>
                  )}
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
