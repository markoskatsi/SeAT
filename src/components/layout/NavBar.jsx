import { NavLink } from 'react-router-dom';
import './NavBar.scss';

function NavBar() {
    return(
        <nav>
        <div className="navItem">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="navItem">
          <NavLink to="/events">Events</NavLink>
        </div>
        <div className="navItem">
          <NavLink to="/employees">Employees</NavLink>
        </div>
      </nav>
    );
}

export default NavBar;