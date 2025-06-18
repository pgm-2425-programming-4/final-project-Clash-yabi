import { Link } from "@tanstack/react-router";
import "../styles/sidebar.css";


export default function Navbar({ projects }) {
  return (
    <nav className="navbar">
      <div className="navbar__section navbar__section--links">
        <Link to="/" className="navbar__link [&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="navbar__link [&.active]:font-bold">
          About
        </Link>
      </div>

      <div className="navbar__section navbar__section--projects">
        <span className="navbar__label">Projects </span>
        <ul className="navbar__project-list">
          {projects.map((project) => (
            <li key={project.id} className="navbar__project-item">
              <Link
                to={`/projects/${project.id}`}
                className="navbar__link [&.active]:font-bold"
              >
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
