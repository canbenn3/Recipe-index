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
        <Link className="link" to={"/"}>Home</Link> | 
        <Link className="link" to={"/profile"}>My Profile</Link> |
        <a className="link" onClick={logout}>Logout</a>
      </nav>
    </div>
  );
}
