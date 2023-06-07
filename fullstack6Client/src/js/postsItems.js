import React, { useState, useEffect } from "react";
import "../css/comments.css"; 
import "../css/posts.css"; // import the CSS file
import { useParams,useNavigate } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
 const  history=useNavigate();
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.json())
    .then(data => {
      // Handle the retrieved post data
      setPosts(data);
      console.log(data);
    })
    .catch(error => {
      // Handle any errors
      console.log(error);
    });



    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.log(error));
  }, [id]);
   const handleBackClick=()=>{
    history('/application/posts');

   }

  return (
    <div>
     
      {posts && (
        <div className="post-container">
          <div className="post-header">
          <h2 className="post-title">{posts.title}</h2>
          
          <p className="caption">{posts.body}</p>
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

export default Posts