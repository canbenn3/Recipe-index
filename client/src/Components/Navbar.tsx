import { ChefHat, HomeIcon, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useScreenSize } from "../Context/ScreenSizeContext";

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
  const sz = useScreenSize();
  const iconSize = 32;

  return (
    <nav className="navbar">
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li onClick={handleClick}>
          <Link className="link" to={"/"}>
            {sz.isMobile ? <HomeIcon size={iconSize} /> : "Home"}
          </Link>
        </li>

        <li onClick={handleClick}>
          <Link className="link" to={"/profile"}>
            {sz.isMobile ? <ChefHat size={iconSize} /> : "My Profile"}
          </Link>
        </li>

        <li onClick={handleClick}>
          <a className="link" onClick={logout}>
            {sz.isMobile ? <LogOut size={iconSize} /> : "Logout"}
          </a>
        </li>
      </ul>
    </nav>
  );
}
