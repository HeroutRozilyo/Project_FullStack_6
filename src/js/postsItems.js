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
  const [commentName, setCommentName] = useState("");
const [commentEmail, setCommentEmail] = useState("");
const [commentBody, setCommentBody] = useState("");

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
  const handleAddComment = () => {
    // Create the new comment object
    const newComment = {
      postId: post.id,
      name: commentName,
      email: commentEmail,
      body: commentBody,
    };
  
    // Send a POST request to the server to add the comment
    fetch("http://localhost:3001/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the comments state with the new comment
        setComments([...comments, data]);
  
        // Clear the input fields
        setCommentName("");
        setCommentEmail("");
        setCommentBody("");
      })
      .catch((error) => console.log(error));
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
  <div className="add-comment-container">
    <h3 className="add-comment-header">Add a Comment</h3>
    <input
      type="text"
      placeholder="Your Name"
      value={commentName}
      onChange={(e) => setCommentName(e.target.value)}
    />
    <input
      type="email"
      placeholder="Your Email"
      value={commentEmail}
      onChange={(e) => setCommentEmail(e.target.value)}
    />
    <textarea
      placeholder="Your Comment"
      value={commentBody}
      onChange={(e) => setCommentBody(e.target.value)}
    ></textarea>
    <button className="add-comment-button" onClick={handleAddComment}>
      Add Comment
    </button>
  </div>
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
