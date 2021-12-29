import React from "react";
import { Link } from "react-router-dom";

export default function LostPage() {
  return (
    <div className="row">
      <div className="col s12">
        <Link to="/">
          <div className="card-panel grey lighten-3">
            <h5 className="purple-text">Thank you.</h5>
            <h6 className="purple-text">Click to go first page.</h6>
          </div>
        </Link>
      </div>
    </div>
  );
}
