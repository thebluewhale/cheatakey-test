import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import R from "ramda";

import { attemptToGetTestLists } from "_thunks/tests";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attemptToGetTestLists())
      .catch(R.identity())
      .then(() => {});
  }, []);

  return (
    <div className="row">
      <div className="col s12 m5">
        <div className="card-panel teal">
          <Link to="/test">
            <h2 className="white-text center-align">Click to start</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
