import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container">
      <h2>
        <Link to="/test">CLICK TO START TEST</Link>
      </h2>
    </div>
  );
}
