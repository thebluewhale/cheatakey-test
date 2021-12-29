export const GET_TEST_LISTS = "GET_TEST_LISTS";
export const SET_TEST_LISTS = "SET_TEST_LISTS";
export const SET_TESTER_VARIABLES = "SET_TESTER_VARIABLES";
export const POST_TEST_RESULT = "POST_TEST_RESULT";

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
