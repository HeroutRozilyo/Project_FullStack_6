import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "../css/application.css";
import { FaEye } from "react-icons/fa";

function Application() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate(); // Access the navigate function

  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          // If user is not authenticated, navigate to login page
          navigate("/login");
          return;
        }
  
        // Fetch posts from the API
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
        const postsData = await postsResponse.json();
        setPosts(postsData.slice(0, 5));
  
        // Fetch albums from the API
        const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`);
        const albumsData = await albumsResponse.json();
        setAlbums(albumsData.slice(0, 5));
  
        // Fetch todos from the API
        const todosResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/todos`);
        const todosData = await todosResponse.json();
        setTodos(todosData.slice(0, 5));
      } catch (error) {
        console.log("Error occurred while fetching data:", error);
        // Additional error handling if needed
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div>
      <h1 className="header">Welcome {user && user.name}!</h1>
      <div className="contentAP">
        <div className="sectionAP" id="posts">
          <Link to="/application/posts">
            <h2>
              <FaEye className="section-icon" />
              Posts
            </h2>
          </Link>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
        <div className="sectionAP" id="album">
          <Link to="/application/albums">
            <h2>
              {" "}
              <FaEye className="section-icon" />
              Albums
            </h2>
          </Link>
          <ul>
            {albums.map((album) => (
              <li key={album.id}>{album.title}</li>
            ))}
          </ul>
        </div>
        <div className="sectionAP" id="todos">
          <Link to="/application/todos">
            <h2>
              <FaEye className="section-icon" />
              Todos
            </h2>
          </Link>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.completed ? (
                  <span className="incomplete-task">
                    <i className="fas fa-times"></i>
                  </span>
                ) : (
                  <span className="completed-task">
                    <i className="fas fa-check"></i>
                  </span>
                )}
                {todo.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Application
