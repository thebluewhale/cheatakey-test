import { getTestLists, postTestResult, postTesterVariables } from "_api/tests";
import { setTestLists, setTesterVariables } from "_actions/tests";
import { dispatchError } from "_utils/api";

export const attemptToGetTestLists = () => (dispatch) =>
  getTestLists()
    .then((data) => {
      dispatch(setTestLists(data.lists));
      return data.lists;
    })
    .catch(dispatchError(dispatch));

export const attemptToSetTesterVariables =
  (testType, keyboardType, nickName) => (dispatch) =>
    postTesterVariables()
      .then((data) => {
        dispatch(setTesterVariables({ testType, keyboardType, nickName }));
        return data.variables;
      })
      .catch(dispatchError(dispatch));

export const attempToPostTestResult =
  (
    presented,
    submitted,
    leadTime,
    accuracy,
    speed,
    testType,
    keyboardType,
    nickName,
    reportType
  ) =>
  (dispatch) =>
    postTestResult({
      presented,
      submitted,
      leadTime,
      accuracy,
      speed,
      testType,
      keyboardType,
      nickName,
      reportType,
    })
      .then((data) => {
        return data;
      })
      .catch(dispatchError(dispatch));
