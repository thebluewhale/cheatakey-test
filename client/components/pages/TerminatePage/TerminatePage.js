import React from "react";
import { Link } from "react-router-dom";

export default function LostPage() {
  return (
    <div className="row">
      <div className="col s12 m5">
        <Link to="/">
          <div className="card-panel teal white-text">
            <h4>Thank you.</h4>
            <h4>Click to go first page.</h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
