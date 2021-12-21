import update from "immutability-helper";
import R from "ramda";

import {
  SET_TEST_LISTS,
  SET_TESTER_VARIABLES,
  POST_TEST_RESULT,
} from "_actions/tests";

export default function tests(state = {}, action) {
  switch (action.type) {
    case SET_TEST_LISTS:
      return update(state, {
        lists: { $set: action.lists },
      });
    case SET_TESTER_VARIABLES:
      return update(state, {
        variables: { $set: action.variables },
      });
    default:
      return state;
  }
}
