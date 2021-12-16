import update from "immutability-helper";
import R from "ramda";

import { SET_TEST_LISTS, POST_TEST_RESULTS } from "_actions/tests";

export default function tests(state = {}, action) {
  switch (action.type) {
    case SET_TEST_LISTS:
      return update(state, {
        lists: { $set: action.lists },
      });
    default:
      return state;
  }
}
