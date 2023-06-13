import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSave, AiOutlineClose } from "react-icons/ai";
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  const handleEditComment = (commentId) => {
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    if (commentToEdit) {
      setSelectedComment(commentId);
      setCommentName(commentToEdit.name);
      setCommentEmail(commentToEdit.email)
      setCommentBody(commentToEdit.body);
      setIsEditMode(true);
      setScrollPosition(window.scrollY);
      window.scrollTo(0, 0); // Scroll to top of the page
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setSelectedComment(null);
    setCommentName("");
    setCommentEmail("")
    setCommentBody("");
    window.scrollTo(0, scrollPosition); // Scroll back to the previous position
  };

  const resetComments = (response, method) => {
    if(response.ok) {
      fetch(`http://localhost:3001/api/comments?postId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the comments state with the new comment
        setComments(data);
        if(method === "put") {
          window.scrollTo(0, scrollPosition)
        }
        // Clear the input fields
        setCommentName("");
        setCommentEmail("");
        setCommentBody("");
      })
      .catch((error) => alert(error));
    } else {
      response.text()
      .then(err => alert(err))
      .catch(err => alert(err));
    }
  }

  const handleDeleteComment = (commentId) => {
    fetch(`http://localhost:3001/api/comments/${commentId}`, {
      method: "DELETE",
    })
      .then(res => resetComments(res, "delete"));
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
      .then(res => resetComments(res, "post"));
  };

  const handleUpdateComment = (commentId) => {
    // Create the updated comment object
    const updatedComment = {
      name: commentName,
      email: commentEmail,
      body: commentBody,
    };
  
    // Send a PUT request to the server to update the comment
    fetch(`http://localhost:3001/api/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedComment),
    })
      .then((res) => resetComments(res, "put"))
      .then(setIsEditMode(false));
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
  <h3 className="add-comment-header">
    {isEditMode? "Edit Comment" : "Add a Comment"}
  </h3>
  <form>
  <div className="add-comment-container">
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
    {!isEditMode?
    <button className="add-comment-button" onClick={handleAddComment}>
      Add Comment
    </button>:
    <div className="edit-buttons">
      <button className="save-button" onClick={() => handleUpdateComment(selectedComment)}>
        <AiOutlineSave />
      </button>
      <button className="cancel-button" onClick={handleCancelEdit}>
        <AiOutlineClose />
      </button>
    </div>}
  </div>
  </form>
  {comments.map((comment) => (
    <div key={comment.id} className="comment-container">
      <p className="comment-name">{comment.name}</p>
      <p className="comment-body">{comment.body}</p>
      {!isEditMode && 
        <div className="post-actions">
          <div className="edit-delete-buttons">
            <button className="edit-button" onClick={() => handleEditComment(comment.id)}>
              <AiOutlineEdit />
              Edit
            </button>
            <button className="delete-post-button" onClick={() => handleDeleteComment(comment.id)}>
              <AiOutlineDelete />
              Delete 
            </button>
          </div>
        </div>
      }
    </div>
  ))}


</div>
</div>
  );
}

export default Posts;
