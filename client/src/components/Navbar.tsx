import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="p-4 bg-gray-800">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-white hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/projects" className="text-white hover:underline">
            Projects
          </Link>
        </li>
        <li>
          <Link to="/faq" className="text-white hover:underline">
            FAQ
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-white hover:underline">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
