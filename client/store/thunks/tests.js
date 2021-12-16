import { snakeToCamelCase } from "json-style-converter/es5";
import R from "ramda";

import { getTestLists, postTestResult } from "_api/tests";
import { setTestLists } from "_actions/tests";
import { dispatchError } from "_utils/api";

export const attemptToGetTestLists = () => (dispatch) =>
  getTestLists()
    .then((data) => {
      dispatch(setTestLists(data.lists));
      return data.lists;
    })
    .catch(dispatchError(dispatch));

export const attempToPostTestResult =
  (presented, submitted, leadTime) => (dispatch) =>
    postTestResult({ presented, submitted, leadTime })
      .then((data) => {
        return data;
      })
      .catch(dispatchError(dispatch));
