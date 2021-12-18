import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBarComponent() {
  return (
    <nav>
      <div className="nav-wrapper grey lighten-4">
        <Link to="/" className="brand-logo left purple-text">
          <b>CheatA-Key</b>
        </Link>
        <ul id="nav-mobile" className="right">
          <li>
            <Link to="/admin" className="purple-text">
              admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
