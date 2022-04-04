import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { attemptToSetTesterVariables } from "_thunks/tests";
import {
  KEYBOARD_TYPE_QWERTY,
  KEYBOARD_TYPE_CHEATAKEY,
  KEYBOARD_TYPE_GBOARD,
  TEST_TYPE_PART_B_QWERTY,
  TEST_TYPE_PART_B_GBOARD,
  TEST_TYPE_PART_C_CHEATAKEY,
  TEST_TYPE_PART_D_CHEATAKEY,
  TEST_TYPE_PART_E_CHEATAKEY,
  TEST_TYPE_PART_E_CHEATAKEY_ONEHAND,
  TEST_TYPE_PART_E_QWERTY_ONEHAND,
  TEST_TYPE_PART_E_GBOARD_ONEHAND,
} from "_utils/variables";
import M from "materialize-css";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const [selectedTestType, setSelectedTestType] = useState("");
  const [selectedKeyboardType, setSelectedKeyboardType] = useState("");
  const [nickName, setNickName] = useState("");

  const onKeyboardTypeSelectChange = (e) => {
    setSelectedKeyboardType(e.target.value);
  };

  const onTestTypeSelectChange = (e) => {
    setSelectedTestType(e.target.value);
  };

  const onSubmitVariables = () => {
    if (
      selectedTestType == "" ||
      selectedKeyboardType == "" ||
      nickName == ""
    ) {
      M.Modal.init(document.getElementById("modal1")).open();
    } else {
      dispatch(
        attemptToSetTesterVariables(
          selectedTestType,
          selectedKeyboardType,
          nickName
        )
      ).then(() => {
        dispatch(push("/guide"));
      });
    }
  };

  const onNickNameInputchanged = (e) => {
    setNickName(e.target.value);
  };

  useEffect(() => {
    M.FormSelect.init(document.querySelectorAll("select"));
    M.Modal.init(document.querySelectorAll(".modal"));
  });

  return (
    <div className="row">
      <div className="input-field col s12">
        <select
          defaultValue="test-type-default"
          onChange={onTestTypeSelectChange}
        >
          <option value="test-type-default" disabled>
            Choose test type
          </option>
          <option value={TEST_TYPE_PART_B_QWERTY}>PART B : QWERTY</option>
          <option value={TEST_TYPE_PART_B_GBOARD}>PART B : GBOARD</option>
          <option value={TEST_TYPE_PART_C_CHEATAKEY}>
            PART C : NEW Keyboard
          </option>
          <option value={TEST_TYPE_PART_D_CHEATAKEY}>
            PART D : NEW Keyboard
          </option>
          <option value={TEST_TYPE_PART_E_CHEATAKEY}>
            PART E : NEW Keyboard
          </option>
          <option value={TEST_TYPE_PART_E_QWERTY_ONEHAND}>
            PART E : QWERTY One hand
          </option>
          <option value={TEST_TYPE_PART_E_GBOARD_ONEHAND}>
            PART E : Gboard One hand
          </option>
          <option value={TEST_TYPE_PART_E_CHEATAKEY_ONEHAND}>
            PART E : New Keyboard One hand
          </option>
        </select>
        <label>Test type</label>
      </div>
      <div className="input-field col s12">
        <select
          defaultValue="keyboard-type-default"
          onChange={onKeyboardTypeSelectChange}
        >
          <option value="keyboard-type-default" disabled>
            Choose keyboard type
          </option>
          <option value={KEYBOARD_TYPE_QWERTY}>QWERTY</option>
          <option value={KEYBOARD_TYPE_GBOARD}>Gboard</option>
          <option value={KEYBOARD_TYPE_CHEATAKEY}>CheatA-Key</option>
        </select>
        <label>Keyboard type</label>
      </div>
      <div className="input-field col s12">
        <input
          id="nickName"
          type="text"
          className="validate"
          value={nickName}
          onChange={onNickNameInputchanged}
          autoComplete="off"
        />
        <label htmlFor="nickName">Nick Name</label>
      </div>
      <div className="col s12">
        <button
          className="btn waves-effect waves-light purple lighten-2"
          onClick={onSubmitVariables}
        >
          Submit
        </button>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h5>Every options should be selected.</h5>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-purple lighten-2 btn-flat"
            >
              OK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
