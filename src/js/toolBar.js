import React from "react";
import { NavLink } from "react-router-dom";
import "../css/toolBar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Toolbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="toolbar">
      <ul className="menuBar">
        <li>
          <NavLink
            to={`/users/${user && user.username}`}
            exact="true"
            className={({ isActive }) => (isActive ? "my-link" : null)}
          >
            <i className="toolbar-icon fas fa-home"></i>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/users/${user && user.username}/info`}
            exact="true"
            className={({ isActive }) => (isActive ? "my-link" : null)}
          >
            <i className="toolbar-icon fas fa-info-circle"></i>
            Info
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/users/${user && user.username}/todos`}
            exact="true"
            className={({ isActive }) => (isActive ? "my-link" : null)}
          >
            <i className="toolbar-icon fas fa-list"></i>
            Todos
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/users/${user && user.username}/posts`}
            exact="true"
            className={({ isActive }) => (isActive ? "my-link" : null)}
          >
            <i className="toolbar-icon fas fa-pencil-alt"></i>
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/users/${user && user.username}/albums`}
            exact="true"
            className={({ isActive }) => (isActive ? "my-link" : null)}
          >
            <i className="toolbar-icon fas fa-images"></i>
            Albums
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            exact="true"
            className={({ isActive }) => (isActive ? "my-link" : null)}
            onClick={() => localStorage.removeItem("user")}
          >
            <i className="toolbar-icon fas fa-sign-out-alt"></i>
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Toolbar;
