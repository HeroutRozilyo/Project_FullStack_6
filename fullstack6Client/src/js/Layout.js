import React from "react";
import Toolbar from "./toolBar";
import { Outlet } from "react-router-dom";
import "../css/Layout.css"; // Import the CSS file for the layout
import Footer from "./Footer";
export default function Layout() {
  return (
    <>
      <Toolbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
