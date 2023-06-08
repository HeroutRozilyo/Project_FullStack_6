
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
          <Route path="application" element={<Application />} />
          <Route path="application/info" element={<Info />} />
          <Route path="application/todos" element={<Todos />} />
          <Route path="application/posts" element={<PostsMain />} />
          <Route
            path="application/posts/:id/comments"
            element={<PostsItem />}
          />

          <Route path="application/albums" element={<AlbumsMain />} />
          <Route
            path="application/albums/:id/photos"
            element={<AlbumsItem />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
