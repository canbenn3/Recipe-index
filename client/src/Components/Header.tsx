import React from "react";
import { Link } from "react-router";


async function logout() {
  const res = await fetch("/registration/logout/", {
    credentials: "same-origin", // include cookies!
  });

  if (res.ok) {
    // navigate away from the single page app!
    window.location.href = "/registration/sign_in/";
  } else {
    // handle logout failed!
  }
}

export function Header() {
  return (
    <div className="header">
      <h1>Recipe Index</h1>
      <nav>
        <Link to={"/"}>Home</Link> | 
        <Link to={"/profile"}>Profile</Link> |
        <a>Logout</a>
      </nav>
    </div>
  );
}
