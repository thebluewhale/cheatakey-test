import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router";
import ReactNotification from "react-notifications-component";

// import { attemptGetUser } from "_thunks/user";

import HomePage from "_pages/HomePage";
import LostPage from "_pages/LostPage";
import SettingsPage from "_pages/SettingsPage";
import TestPage from "_pages/TestPage";
import TerminatePage from "_pages/TerminatePage";
import NavigationBar from "_organisms/NavigationBar";
import Footer from "_organisms/Footer";

export default function Main({ location }) {
  useEffect(() => {
    let subscribed = true;

    return () => {
      subscribed = false;
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <ReactNotification />
      <NavigationBar />
      <div className="main container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/test" component={TestPage} />
          <Route exact path="/terminate" component={TerminatePage} />
          <Route path="*" component={LostPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

Main.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
