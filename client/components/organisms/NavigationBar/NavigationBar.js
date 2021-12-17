import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBarComponent() {
  return (
    <nav>
      <div className="nav-wrapper purple lighten-1">
        <Link to="/" className="brand-logo left">
          CheatA-Key
        </Link>
        <ul id="nav-mobile" className="right">
          <li>
            <Link to="/admin">admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
