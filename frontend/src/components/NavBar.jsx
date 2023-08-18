// Libraries
import { NavLink } from "react-router-dom";

function navBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">home</NavLink>
        </li>
        <li>
          <NavLink to="/post">post</NavLink>
        </li>
        <li>
          <NavLink to="/account">account</NavLink>
        </li>
        {/* <li>
          <NavLink to="/dashboard">dashboard</NavLink>
        </li> */}
      </ul>
    </nav>
  );
}

export default navBar;
