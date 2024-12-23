import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="menu-icon">☰</div>
      <div className="title">Name</div>
      <div className="coins">48 🪙</div>
    </div>
  );
}

export default Header;