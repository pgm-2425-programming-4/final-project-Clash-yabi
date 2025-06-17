import React from "react";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul className="sidebar__list">
        <li className="sidebar__item">
          <a href="#home" className="sidebar__link sidebar__link--active">
            Home
          </a>
        </li>

        <li className="sidebar__label">PROJECTS</li>
        <li className="sidebar__item">
          <a href="#pgm3" className="sidebar__link">
            PGM3
          </a>
        </li>
        <li className="sidebar__item">
          <a href="#pgm4" className="sidebar__link">
            PGM4
          </a>
        </li>

        <li className="sidebar__label sidebar__label--spaced">INFO</li>
        <li className="sidebar__item">
          <a href="#about" className="sidebar__link">
            About
          </a>
        </li>
      </ul>
    </nav>
  );
};
  

export default Sidebar;
