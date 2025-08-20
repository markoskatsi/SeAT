import { NavLink, useLocation } from "react-router-dom";
import { useUser } from "../../auth/UserContext";
import "./Header.scss";

function Header() {
  const { loggedInUser, loading, logout } = useUser();
  const location = useLocation();
  console.log(location);

  return (
    <header>
      {loggedInUser && (
        <div className="navItems-left">
          <NavLink className="navItem" to="/events">
            Events
          </NavLink>
          <NavLink className="navItem" to="/users">
            Manage CSV Data
          </NavLink>
        </div>
      )}
      <h1 className="titleNav">SeAT</h1>
      {loggedInUser && (
        <div className="navItems-right">
          <NavLink className="navItem" to="/" onClick={logout}>
            Logout
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
