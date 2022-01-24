import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { attempToPostTestResult } from "_thunks/tests";
import {
  TEST_TYPE_QWERTY,
  TEST_TYPE_CTK_FIRST,
  TEST_TYPE_CTK_PRACTICE,
  TEST_TYPE_CTK_FINAL,
  REPORT_TYPE_SUBMIT,
  REPORT_TYPE_ERROR_TYPO,
} from "_utils/variables";
import R from "ramda";

export default function TestPage() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.tests.lists);
  const variables = useSelector((state) => state.tests.variables);
  const [maxProgress, setMaxProgress] = useState(20);
  const [extractedLists, setExtractedLists] = useState([]);
  const [submittedText, setSubmittedText] = useState("");
  const [presentedText, setPresentedText] = useState("");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState(new Date());
  const [accuracy, setAccuracy] = useState(0);
  const [speed, setSpeed] = useState(0.0);
  const [isStarted, setIsStarted] = useState(false);
  const [isErrorTypoReported, setIsErrorTypoReported] = useState(false);
  const submitInput = useRef();

  const onSubmitInputKeyDown = (e) => {
    if (e.key == "Backspace" && isErrorTypoReported == false) {
      setIsErrorTypoReported(true);
      dispatch(
        attempToPostTestResult(
          presentedText,
          submittedText,
          0,
          0,
          0,
          variables.testType,
          variables.keyboardType,
          variables.nickName,
          REPORT_TYPE_ERROR_TYPO
        )
      )
        .catch(R.identity())
        .then(() => {});
    } else if (e.key != "Backspace" && isErrorTypoReported == true) {
      setIsErrorTypoReported(false);
    }

    // if (e.key == "Backspace") {
    //   e.preventDefault();
    // }
  };

  const onSubmitInputChanged = (e) => {
    if (e.target.value.length == 1 && isStarted == false) {
      setStartTime(new Date());
      setIsStarted(true);
    }
    setSubmittedText(e.target.value.toLowerCase());
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
        speed,
        variables.testType,
        variables.keyboardType,
        variables.nickName,
        REPORT_TYPE_SUBMIT
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
    // const shuffle = (array) => {
    //   for (let index = array.length - 1; index > 0; index--) {
    //     const randomPosition = Math.floor(Math.random() * (index + 1));
    //     const temp = array[index];
    //     array[index] = array[randomPosition];
    //     array[randomPosition] = temp;
    //   }
    // };

    let _extractedLists = [];
    switch (variables.testType) {
      case TEST_TYPE_QWERTY:
      case TEST_TYPE_CTK_FIRST:
        // 10 sentences
        _extractedLists = lists.slice(0, 10);
        break;
      case TEST_TYPE_CTK_PRACTICE:
        // 5 set, 20 sentences per set
        let tempList = lists.slice(10, 30);
        for (let i = 0; i < 5; i++) {
          tempList.map((data, index) => {
            _extractedLists.push(data);
          });
        }
        break;
      case TEST_TYPE_CTK_FINAL:
        // 5 words from part 1 + 5 words
        _extractedLists = lists.slice(3, 8).concat(lists.slice(30, 35));
        break;
      default:
        dispatch(push("/error"));
    }
    setExtractedLists(_extractedLists);
    setMaxProgress(_extractedLists.length);
  }, []);

  useEffect(() => {
    setIsLoading(false);
    setPresentedText(extractedLists[progress]);
  }, [extractedLists]);

  useEffect(() => {
    if (progress == maxProgress) {
      dispatch(push("/terminate"));
    }
    setPresentedText(extractedLists[progress]);
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

  return isLoading ? (
    <div className="preloader-wrapper active">
      <div className="spinner-layer spinner-red-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="row">
      <div className="col s12">
        <div className="progress">
          <div
            className="determinate"
            style={{ width: (progress / maxProgress) * 100 + "%" }}
          ></div>
        </div>
      </div>
      <div className="col s12">
        <h6 className="right">{`${progress} / ${extractedLists.length}`}</h6>
      </div>
      <div className="col s12">
        <div className="card-panel purple lighten-5">
          <h5 className="grey-text text-darken-2">{presentedText}</h5>
        </div>
      </div>
      <div className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input
              id="submitter"
              type="text"
              className="validate"
              value={submittedText}
              onChange={onSubmitInputChanged}
              onKeyDown={onSubmitInputKeyDown}
              ref={submitInput}
              autoComplete="off"
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
      </div>
    </div>
  );
}
