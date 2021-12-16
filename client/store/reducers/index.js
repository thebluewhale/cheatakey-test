import { combineReducers, conbimeReducers } from "redux";
import { connectRouter } from "connected-react-router";

import tests from "./tests";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    tests,
  });

export default createRootReducer;
