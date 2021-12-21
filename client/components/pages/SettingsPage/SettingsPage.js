import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { attemptToSetTesterVariables } from "_thunks/tests";
import R from "ramda";
import M from "materialize-css";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const [selectedTestType, setSelectedTestType] = useState("");
  const [selectedKeyboardType, setSelectedKeyboardType] = useState("");

  const onTestTypeSelectChange = (e) => {
    setSelectedTestType(e.target.value);
  };

  const onKeyboardTypeSelectChange = (e) => {
    setSelectedKeyboardType(e.target.value);
  };

  const onSubmitVariables = () => {
    if (selectedTestType == "" || selectedKeyboardType == "") {
      M.Modal.init(document.getElementById("modal1")).open();
    } else {
      dispatch(
        attemptToSetTesterVariables(selectedTestType, selectedKeyboardType)
      ).then(() => {
        dispatch(push("/test"));
      });
    }
  };

  useEffect(() => {
    M.FormSelect.init(document.querySelectorAll("select"));
    M.Modal.init(document.querySelectorAll(".modal"));
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
          <option value="test-type-1st">1st Test</option>
          <option value="test-type-2nd">2nd Test</option>
          <option value="test-type-practice">Practice</option>
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
          <option value="keyboard-type-qwerty">QWERTY</option>
          <option value="keyboard-type-cheatakey">CheatA-Key</option>
        </select>
        <label>Keyboard type</label>
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
