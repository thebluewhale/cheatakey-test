import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { attempToPostTestResult } from "_thunks/tests";
import R from "ramda";

export default function TestPage() {
  const MAX_PROGRESS = 2;
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.tests.lists);
  const variables = useSelector((state) => state.tests.variables);
  const [submittedText, setSubmittedText] = useState("");
  const [presentedText, setPresentedText] = useState("");
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [accuracy, setAccuracy] = useState(0);
  const [speed, setSpeed] = useState(0.0);
  const [isStarted, setIsStarted] = useState(false);
  const submitInput = useRef();

  const updateText = (e) => {
    if (e.target.value.length == 1 && isStarted == false) {
      setStartTime(new Date());
      setIsStarted(true);
    }
    setSubmittedText(e.target.value);
  };

  const onSubmitText = () => {
    setProgress(progress + 1);
    let endTime = new Date();
    let leadTime = endTime.getTime() - startTime.getTime();
    dispatch(
      attempToPostTestResult(
        presentedText,
        submittedText,
        leadTime,
        accuracy,
        speed
      )
    )
      .catch(R.identity())
      .then(() => {});
    setSubmittedText("");
    setIsStarted(false);
    setAccuracy(0);
    submitInput.current.focus();
  };

  useEffect(() => {
    console.log(variables);
  });

  useEffect(() => {
    if (progress == MAX_PROGRESS) {
      dispatch(push("/terminate"));
    }
    setPresentedText(lists[progress]);
  }, [progress]);

  useEffect(() => {
    // Calc speed
    if (submittedText.length > 0) {
      let currentTime = new Date();
      let leadSec = (currentTime.getTime() - startTime.getTime()) / 1000;
      setSpeed(((submittedText.length / leadSec) * 60).toFixed(0));
    }
    // Calc accuracy
    let errorTextCount = 0;
    for (let i = 0; i < submittedText.length; i++) {
      if (submittedText[i] != presentedText[i]) {
        errorTextCount++;
      }
    }
    setAccuracy((1 - errorTextCount / submittedText.length) * 100);
  }, [submittedText]);

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
        <div className="card-panel purple lighten-5">
          <h5 className="grey-text text-darken-2">{presentedText}</h5>
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
              ref={submitInput}
            />
            <label htmlFor="submitter">Type here</label>
          </div>
        </div>
        <div className="col s12">
          <h6 className="right">{`accuracy : ${accuracy} %`}</h6>
        </div>
        <div className="col s12">
          <h6 className="right">{`speed : ${speed} / min`}</h6>
        </div>
        <div className="col s12">
          <div className="btn purple lighten-2" onClick={onSubmitText}>
            Submit
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}
