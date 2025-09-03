import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">AutoResume AI</Link>
      </div>
      <ul className="navbar__links">
        <li className={pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={pathname === "/analyze" ? "active" : ""}>
          <Link to="/analyze">Analyze</Link>
        </li>
        <li className={pathname === "/results" ? "active" : ""}>
          <Link to="/results">Results</Link>
        </li>
        <li className={pathname === "/about" ? "active" : ""}>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
