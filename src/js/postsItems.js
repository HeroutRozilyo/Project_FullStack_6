import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import "../css/comments.css";
import "../css/posts.css";

function Posts() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:3001/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch(`http://localhost:3001/api/comments?postId=${id}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleBackClick = () => {
    history(`/users/${user.username}/posts`);
  };


  return (
    <div>
      {post && (
        <div className="post-container">
          <div className="post-header">
            <h2 className="post-title">{post.title}</h2>
            <p className="caption">{post.body}</p>
            <button
              className="view-comments-button"
              onClick={() => handleBackClick()}
            >
              Back to Posts
            </button>
           
          </div>
        </div>
      )}

      <div className="post-comments">
        <h3 className="comments-header">Comments</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="comment-container">
            <p className="comment-name">{comment.name}</p>
            <p className="comment-body">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
