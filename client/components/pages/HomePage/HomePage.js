import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import R from "ramda";
import qs from "qs";
import { attemptToGetTestLists } from "_thunks/tests";
import { push } from "connected-react-router";

export default function HomePage() {
  const dispatch = useDispatch();
  let { ua } = useParams();
  const [preloadState, setPreloadState] = useState(true);
  const [preloadImgClass, setPreloadImgClass] = useState("");
  const location = useLocation();
  const queryData = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    if (queryData.caller == "mobile") {
      dispatch(push("/callibration"));
    } else {
      dispatch(attemptToGetTestLists())
        .catch(R.identity())
        .then(() => {});

      setTimeout(() => {
        setPreloadImgClass("img-fadeout");
        setTimeout(() => {
          setPreloadState(false);
        }, 1000);
      }, 2000);
    }
  }, []);

  return (
    <div className="row">
      <div className="col s12 m5">
        {preloadState ? (
          <div className={`center-align ${preloadImgClass}`}>
            <img src="./images/app_logo.png"></img>
          </div>
        ) : (
          <Link to="/settings">
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
