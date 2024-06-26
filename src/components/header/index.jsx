import { Link } from "react-router-dom";
import "./index.scss";
const Header = () => {
  return (
    <div className="header">
      <nav className="header__nav">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Link to={"/contact"}>Contact</Link>
        </li>
      </nav>
    </div>
  );
};

export default Header;
