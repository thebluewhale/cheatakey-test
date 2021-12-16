export const GET_TEST_LISTS = "GET_TEST_LISTS";
export const SET_TEST_LISTS = "SET_TEST_LISTS";
export const POST_TEST_RESULTS = "POST_TEST_RESULTS";

export const getTestLists = () => ({
  type: GET_TEST_LISTS,
});

export const setTestLists = (lists) => ({
  type: SET_TEST_LISTS,
  lists,
});

export const postTestResults = ({ presented, submitted, leadTime }) => ({
  type: POST_TEST_RESULTS,
  presented,
  submitted,
  leadTime,
});
