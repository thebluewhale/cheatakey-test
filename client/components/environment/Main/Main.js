import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router";
import ReactNotification from "react-notifications-component";
import { useDispatch } from "react-redux";
import R from "ramda";

// import { attemptGetUser } from "_thunks/user";

import WelcomePage from "_pages/WelcomePage";
import LostPage from "_pages/LostPage";

import Footer from "_organisms/Footer";

export default function Main({ location }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscribed = true;

    // dispatch(attemptGetUser())
    //   .then(() => subscribed && setLoading(false))
    //   .catch(R.identity);

    return () => {
      subscribed = false;
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    !loading && (
      <div>
        <ReactNotification />
        <div className="main">
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route path="*" component={LostPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  );
}

Main.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
