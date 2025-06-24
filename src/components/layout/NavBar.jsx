import { useAuth } from "../../auth/useAuth";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

function NavBar() {
  const { loggedInUser, logout } = useAuth();

  return (
    <nav>
      <div className="navItem">
        <NavLink to="/">Home</NavLink>
      </div>

      {loggedInUser && (
        <>
          <div className="navItem">
            <NavLink to="/events">Events</NavLink>
          </div>
          <div className="navItem">
            <NavLink to="/employees">Employees</NavLink>
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
