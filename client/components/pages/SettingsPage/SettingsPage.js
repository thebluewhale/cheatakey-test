import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { attemptToSetTesterVariables } from "_thunks/tests";
import {
  KEYBOARD_TYPE_QWERTY,
  KEYBOARD_TYPE_CHEATAKEY,
  TEST_TYPE_QWERTY,
  TEST_TYPE_CTK_FIRST,
  TEST_TYPE_CTK_PRACTICE,
  TEST_TYPE_CTK_FINAL,
} from "_utils/variables";
import M from "materialize-css";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const [selectedTestType, setSelectedTestType] = useState("");
  const [selectedKeyboardType, setSelectedKeyboardType] = useState("");
  const [nickName, setNickName] = useState("");

  const onTestTypeSelectChange = (e) => {
    setSelectedTestType(e.target.value);
  };

  const onKeyboardTypeSelectChange = (e) => {
    setSelectedKeyboardType(e.target.value);
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
    setTimeout(() => {
      M.FormSelect.init(document.querySelectorAll("select"));
      M.Modal.init(document.querySelectorAll(".modal"));
    }, 300);
  }, []);

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
          <option value={TEST_TYPE_QWERTY}>QWERTY Test</option>
          <option value={TEST_TYPE_CTK_FIRST}>First CheatA-Key Test</option>
          <option value={TEST_TYPE_CTK_PRACTICE}>CheatA-Key Practice</option>
          <option value={TEST_TYPE_CTK_FINAL}>Final CheatA-Key Test</option>
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
          <option value={KEYBOARD_TYPE_CHEATAKEY}>CheatA-Key</option>
        </select>
        <label>Keyboard type</label>
      </div>
      <div className="col s12">
        <div className="input-field">
          <input
            id="nickName"
            type="text"
            className="validate"
            value={nickName}
            onChange={onNickNameInputchanged}
          />
          <label htmlFor="nickName">Nick Name</label>
        </div>
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
