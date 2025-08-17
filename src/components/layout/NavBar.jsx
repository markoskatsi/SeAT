import { useUser } from "../../auth/UserContext";
import { NavLink } from "react-router-dom";

function NavBar() {
  const { loggedInUser, logout } = useUser();

  return (
    <nav>
      <div className="navItem">
        <NavLink to="/" end>
          Home
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/events">Events</NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/users">Users</NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/eventInfo">Event Info</NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/profile">Profile</NavLink>
      </div>
      {!loggedInUser && (
        <>
          <div className="navItem">
            <NavLink to="/login">Login</NavLink>
          </div>
          <div className="navItem">
            <NavLink to="/register">Register</NavLink>
          </div>
        </>
      )}
      {loggedInUser && (
        <div className="navItem">
          <NavLink to="/" onClick={logout}>
            Logout
          </NavLink>
        </div>
      )}
    </nav>
  );
}
export default NavBar;
