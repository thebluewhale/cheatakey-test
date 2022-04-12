import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { attempToPostTestResult } from "_thunks/tests";
import {
  REPORT_TYPE_ERROR_TYPO,
  REPORT_TYPE_SUBMIT,
  TEST_TYPE_PART_B_QWERTY,
  TEST_TYPE_PART_B_GBOARD,
  TEST_TYPE_PART_C_CHEATAKEY,
  TEST_TYPE_PART_D_CHEATAKEY,
  TEST_TYPE_PART_E_CHEATAKEY,
  TEST_TYPE_PART_E_CHEATAKEY_ONEHAND,
  TEST_TYPE_PART_E_QWERTY_ONEHAND,
  TEST_TYPE_PART_E_GBOARD_ONEHAND,
  TEST_TYPE_COMPETITION_A,
  TEST_TYPE_COMPETITION_B,
} from "_utils/variables";
import { leven, calcCompetitionPoint } from "_utils/competition";
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
  const [isStarted, setIsStarted] = useState(false);
  const [isErrorTypoReported, setIsErrorTypoReported] = useState(false);
  const [lastInputValueLength, setLastInputValueLength] = useState(0);
  const [competitionPoint, setCompetitionPoint] = useState(0);
  const submitInput = useRef();

  const onSubmitInputChanged = (e) => {
    if (
      e.target.value.length <= lastInputValueLength &&
      isErrorTypoReported == false
    ) {
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
    } else if (
      e.target.value.length > lastInputValueLength &&
      isErrorTypoReported == true
    ) {
      setIsErrorTypoReported(false);
    }

    if (e.target.value.length == 1 && isStarted == false) {
      setStartTime(new Date());
      setIsStarted(true);
    }
    setSubmittedText(e.target.value.toLowerCase());
    setLastInputValueLength(e.target.value.length);
  };

  const onSubmitText = () => {
    setProgress(progress + 1);
    setLastInputValueLength(0);
    // calc speed
    let endTime = new Date();
    let leadTime = endTime.getTime() - startTime.getTime();
    let speed = ((presentedText.length / leadTime) * 60 * 1000).toFixed(0);
    // calc accuracy
    let accuracy = leven(presentedText, submittedText);
    // save for final data
    // post result
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
    setCompetitionPoint(
      competitionPoint + calcCompetitionPoint(presentedText, leadTime, accuracy)
    );
    submitInput.current.focus();
  };

  useEffect(() => {
    const shuffle = (array) => {
      let tempArray = JSON.parse(JSON.stringify(array));
      for (let index = tempArray.length - 1; index > 0; index--) {
        const randomPosition = Math.floor(Math.random() * (index + 1));
        const temp = tempArray[index];
        tempArray[index] = tempArray[randomPosition];
        tempArray[randomPosition] = temp;
      }
      return tempArray;
    };

    let _extractedLists = [];
    switch (variables.testType) {
      case TEST_TYPE_PART_B_QWERTY:
      case TEST_TYPE_PART_B_GBOARD:
      case TEST_TYPE_PART_C_CHEATAKEY:
      case TEST_TYPE_PART_E_CHEATAKEY:
        // 10 sentences, test set A
        _extractedLists = lists.slice(0, 10);
        break;
      case TEST_TYPE_PART_E_CHEATAKEY_ONEHAND:
      case TEST_TYPE_PART_E_QWERTY_ONEHAND:
      case TEST_TYPE_PART_E_GBOARD_ONEHAND:
        // 10 sentences, test set B
        _extractedLists = lists.slice(10, 20);
        break;
      case TEST_TYPE_PART_D_CHEATAKEY:
        // 10 sentences, test set B
        _extractedLists = shuffle(lists);
        break;
      case TEST_TYPE_COMPETITION_A:
      case TEST_TYPE_COMPETITION_B:
        let competitionList = lists.slice(0, 20);
        _extractedLists = shuffle(competitionList).slice(0, 2);
        break;
      default:
        dispatch(push("/error"));
    }
    setExtractedLists(_extractedLists);
    setMaxProgress(_extractedLists.length);
    setCompetitionPoint(0);
  }, []);

  useEffect(() => {
    setIsLoading(false);
    setPresentedText(extractedLists[progress]);
  }, [extractedLists]);

  useEffect(() => {
    if (progress == maxProgress) {
      dispatch(
        push(
          `/terminate?point=${(
            Number.parseFloat(competitionPoint) * 10
          ).toFixed(2)}`
        )
      );
    }
    setPresentedText(extractedLists[progress]);
  }, [progress]);

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
              ref={submitInput}
              autoComplete="off"
            />
            <label htmlFor="submitter">Type here</label>
          </div>
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
