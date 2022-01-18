export const GET_TEST_LISTS = "GET_TEST_LISTS";
export const SET_TEST_LISTS = "SET_TEST_LISTS";
export const SET_TESTER_VARIABLES = "SET_TESTER_VARIABLES";
export const POST_TEST_RESULT = "POST_TEST_RESULT";
export const POST_GESTURE_RESULT = "POST_GESTURE_RESULT";

export const getTestLists = () => ({
  type: GET_TEST_LISTS,
});

export const setTestLists = (lists) => ({
  type: SET_TEST_LISTS,
  lists,
});

export const setTesterVariables = (variables) => ({
  type: SET_TESTER_VARIABLES,
  variables,
});

export const postTestResult = ({
  presented,
  submitted,
  leadTime,
  accuracy,
  speed,
  testType,
  keyboardType,
  nickName,
  reportType,
}) => ({
  type: POST_TEST_RESULT,
  presented,
  submitted,
  leadTime,
  accuracy,
  speed,
  testType,
  keyboardType,
  nickName,
  reportType,
});

export const postGestureResult = ({
  touchStartX,
  touchStartY,
  touchEndX,
  touchEndY,
  submittedAngle,
  presentedAngle,
  testType,
}) => ({
  type: POST_GESTURE_RESULT,
  touchStartX,
  touchStartY,
  touchEndX,
  touchEndY,
  submittedAngle,
  presentedAngle,
  testType,
});
