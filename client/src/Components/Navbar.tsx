import { Menu } from "lucide-react";
import { useState } from "react";
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

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleClick = () => {
    setMenuOpen((prev) => !prev);
  };
  return (
    <nav className="navbar">
      <button className="menu-btn" onClick={handleClick}>
        <Menu />
      </button>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li onClick={handleClick}>
          <Link className="link" to={"/"}>
            Home
          </Link>
        </li>

        <li onClick={handleClick}>
          <Link className="link" to={"/profile"}>
            My Profile
          </Link>
        </li>

        <li onClick={handleClick}>
          <a className="link" onClick={logout}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}
