import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import R from "ramda";

import { attemptToGetTestLists } from "_thunks/tests";

export default function HomePage() {
  const dispatch = useDispatch();
  const [preloadState, setPreloadState] = useState(true);
  const [preloadImgClass, setPreloadImgClass] = useState("");

  useEffect(() => {
    dispatch(attemptToGetTestLists())
      .catch(R.identity())
      .then(() => {});

    setTimeout(() => {
      setPreloadImgClass("img-fadeout");
      setTimeout(() => {
        setPreloadState(false);
      }, 1000);
    }, 2000);
  }, []);

  return (
    <div className="row">
      <div className="col s12 m5">
        {preloadState ? (
          <div className={`center-align ${preloadImgClass}`}>
            <img src="./images/app_logo.png"></img>
          </div>
        ) : (
          <Link to="/test">
            <div>
              <h4 className="purple-text center-align text-blink">
                TAP TO START
              </h4>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
