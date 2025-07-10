import { useAuth } from "../../auth/useAuth";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

function NavBar() {
  const { loggedInUser, logout } = useAuth();

  return (
    <nav>
      {loggedInUser && (
        <>
          <div className="navItem">
            <NavLink to="/events">Events</NavLink>
          </div>
          <div className="navItem">
            <NavLink to="/employees">Employees</NavLink>
          </div>
          <div className="navItem">
            <NavLink to="/eventInfo">Event Info</NavLink>
          </div>
          <h1>Seat</h1>
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
        </>
      )}
    </nav>
  );
}

export default NavBar;
