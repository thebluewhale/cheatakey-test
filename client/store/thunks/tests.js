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
  (presented, submitted, leadTime, accuracy, speed) => (dispatch) =>
    postTestResult({ presented, submitted, leadTime, accuracy, speed })
      .then((data) => {
        return data;
      })
      .catch(dispatchError(dispatch));
