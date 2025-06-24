import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import "./Header.scss";

function Header() {
  const { loggedInUser, logout } = useAuth();
  return (
    <header>
      <h1>Seat</h1>
      {loggedInUser ? (
        <p className="welcome">Welcome {loggedInUser.UserFirstname}</p>
      ) : (
        <p className="welcome">Welcome Guest</p>
      )}

      {!loggedInUser ? (
        <div className="navItem">
          <NavLink to="/login">Login</NavLink>
        </div>
      ) : (
        <div className="navItem">
          <NavLink to="/" onClick={logout}>
            Logout
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
