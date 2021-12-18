import React from "react";
import { Link } from "react-router-dom";

export default function LostPage() {
  return (
    <div className="row">
      <div className="col s12 m5">
        <Link to="/">
          <div className="card-panel teal white-text">
            <h5>Thank you.</h5>
            <h6>Click to go first page.</h6>
          </div>
        </Link>
      </div>
    </div>
  );
}
