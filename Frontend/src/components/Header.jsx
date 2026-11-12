import React from "react";

function Header(props) {

  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    window.location.href = "/login";
  }

  return (
    <header>

      <h1>Keeper</h1>

      <input
        type="text"
        placeholder="🔍 Search notes..."
        className="search-box"
        onChange={(e) => props.onSearch(e.target.value)}
      />

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

    </header>
  );
}

export default Header;