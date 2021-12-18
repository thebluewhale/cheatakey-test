import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

export default function TestPage() {
  const MAX_PROGRESS = 2;
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.tests.lists);
  const [submittedText, setSubmittedText] = useState("");
  const [presentedText, setPresentedText] = useState("");
  const [progress, setProgress] = useState(0);

  const updateText = (e) => {
    setSubmittedText(e.target.value);
  };

  const onSubmitText = () => {
    setProgress(progress + 1);
  };

  useEffect(() => {
    if (progress == MAX_PROGRESS) {
      dispatch(push("/terminate"));
    }
    setPresentedText(lists[progress]);
  }, [progress]);

  return (
    <div className="row">
      <div className="col s12">
        <div className="progress">
          <div
            className="determinate"
            style={{ width: (progress / MAX_PROGRESS) * 100 + "%" }}
          ></div>
        </div>
      </div>
      <div className="col s12">
        <div className="card-panel teal white-text">
          <h5>{presentedText}</h5>
        </div>
      </div>
      <div className="col s12">
        {/* <form className="col s12"> */}
        <div className="row">
          <div className="input-field col s12">
            <input
              id="submitter"
              type="text"
              className="validate"
              value={submittedText}
              onChange={updateText}
            />
            <label htmlFor="submitter">Type here</label>
          </div>
        </div>
        <div className="col s12">
          <div className="btn" onClick={onSubmitText}>
            Submit
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}
