import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import qs from "qs";

export default function LostPage() {
  const queryData = qs.parse(location.search, { ignoreQueryPrefix: true });

  return (
    <div className="row">
      <div className="col s12">
        <Link to="/">
          <div className="card-panel grey lighten-3">
            <h5 className="purple-text">Thank you.</h5>
            <h6 className="purple-text">Click to go first page.</h6>
            <h6 className="purple-test">Point : {queryData.point}</h6>
          </div>
        </Link>
      </div>
    </div>
  );
}
