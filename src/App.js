
import "./App.css";
import Login from "../src/js/Login.js";
import Main from "../src/js/main.js";
import Info from "../src/js/Info.js";
import Todos from "../src/js/Todos.js";
import Layout from "./js/Layout";
import AlbumsMain from "./js/AlbumsMain";
import AlbumsItem from "./js/AlbumsItem";
import Application from "./js/Application";
import PostsMain from "./js/postsMain.js";
import PostsItem from "./js/postsItems";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
 
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="users/:username" element={<Application />} />
          <Route path="users/:username/info" element={<Info />} />
          <Route path="users/:username/todos" element={<Todos />} />
          <Route path="users/:username/posts" element={<PostsMain />} />
          <Route
            path="users/:username/posts/:id/comments"
            element={<PostsItem />}
          />

          <Route path="users/:username/albums" element={<AlbumsMain />} />
          <Route
            path="users/:username/albums/:id/photos"
            element={<AlbumsItem />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
