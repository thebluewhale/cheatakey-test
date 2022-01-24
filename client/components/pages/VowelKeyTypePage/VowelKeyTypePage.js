import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { attempToPostGestureResult } from "_thunks/tests";
import { TEST_TYPE_CTK_VOWEL_KEY_TYPE } from "_utils/variables";
import R from "ramda";
import M from "materialize-css";

export default function VowelKeyTypePage() {
  const dispatch = useDispatch();
  const variables = useSelector((state) => state.tests.variables);
  const [gestureDirectionIndex, setGestureDirectionIndex] = useState(0);
  const [gestureDirectionArr, setGestureDirectionArr] = useState([
    0, 1, 2, 3, 4,
  ]);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [keyIndex, setKeyIndex] = useState(0);
  const [keyIndexArr, setKeyIndexArr] = useState([0, 1, 2]);
  const [testSetCount, setTestSetCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [vowelKeyImageSrc, setVowelKeyImageSrc] = useState("vowel_key_type_2");
  const MAX_PROGRESS = 80;

  const shuffle = (array) => {
    for (let index = array.length - 1; index > 0; index--) {
      const randomPosition = Math.floor(Math.random() * (index + 1));
      const temp = array[index];
      array[index] = array[randomPosition];
      array[randomPosition] = temp;
    }
  };

  const displayText = (index) => {
    switch (index) {
      case 0:
        return (
          <h3>
            <b>[ a ]</b>
          </h3>
        );
      case 1:
        return (
          <h3>
            <b>[ e ]</b>
          </h3>
        );
      case 2:
        return (
          <h3>
            <b>[ i ]</b>
          </h3>
        );
      case 3:
        return (
          <h3>
            <b>[ o ]</b>
          </h3>
        );
      case 4:
        return (
          <h3>
            <b>[ u ]</b>
          </h3>
        );
    }
  };

  const displayKey = (index) => {
    switch (index) {
      case 0:
        return (
          <div
            className="col s2 offset-s1 key key-normal"
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
          ></div>
        );
      case 1:
        return (
          <div
            className="col s2 offset-s5 key key-normal"
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
          ></div>
        );
      case 2:
        return (
          <div
            className="col s2 offset-s9 key key-normal"
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
          ></div>
        );
    }
  };

  const touchStart = (e) => {
    e.target.classList.remove("key-normal");
    e.target.classList.add("key-pressed");
    let clientX = e.changedTouches[e.changedTouches.length - 1].clientX;
    let clientY = e.changedTouches[e.changedTouches.length - 1].clientY;
    setTouchStartX(clientX);
    setTouchStartY(clientY);
  };

  const touchEnd = (e) => {
    e.target.classList.remove("key-pressed");
    e.target.classList.add("key-normal");
    let clientX = e.changedTouches[e.changedTouches.length - 1].clientX;
    let clientY = e.changedTouches[e.changedTouches.length - 1].clientY;
    let submittedAngle =
      Math.atan2(clientY - touchStartY, clientX - touchStartX) *
      (180 / Math.PI);
    if (submittedAngle < 0.0) submittedAngle += 360.0;
    dispatch(
      attempToPostGestureResult(
        touchStartX,
        touchStartY,
        clientX,
        clientY,
        submittedAngle,
        gestureDirectionArr[gestureDirectionIndex],
        variables.nickName,
        TEST_TYPE_CTK_VOWEL_KEY_TYPE
      )
    )
      .catch(R.identity())
      .then(() => {
        let tempArr = [];
        if (gestureDirectionIndex == 4) {
          if (testSetCount == 8) {
            setVowelKeyImageSrc("vowel_key_type_3");
            M.Modal.init(document.getElementById("modal1")).open();
          }
          if (testSetCount == 2 || testSetCount == 5) {
            tempArr = [0, 1, 2];
            shuffle(tempArr);
            setKeyIndexArr(tempArr);
          }
          setTestSetCount(testSetCount + 1);

          if (keyIndex == 2) {
            setKeyIndex(0);
          } else {
            setKeyIndex(keyIndex + 1);
          }

          tempArr = [0, 1, 2, 3, 4];
          shuffle(tempArr);
          setGestureDirectionArr(tempArr);
          setGestureDirectionIndex(0);
        } else {
          setGestureDirectionIndex(gestureDirectionIndex + 1);
        }
        setProgress(progress + 1);
      });
  };

  useEffect(() => {
    M.Modal.init(document.querySelectorAll(".modal"));
  }, []);

  useEffect(() => {
    if (progress == MAX_PROGRESS) {
      dispatch(push("/terminate"));
    }
  }, [progress]);

  return (
    <div className="vowel-key-type-page">
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
          <h6 className="right">{`${progress} / ${MAX_PROGRESS}`}</h6>
        </div>
      </div>
      <div className="">
        <h5 className="center-align">Refer to the image below and</h5>
        <h5 className="center-align">enter the displayed text by gesture</h5>
        <div className="col s12">
          <div className="center-align">
            <img
              src={`./images/${vowelKeyImageSrc}.png`}
              className="vowel-img"
            ></img>
          </div>
        </div>
        <div className="center-align purple-text">
          {displayText(gestureDirectionArr[gestureDirectionIndex])}
        </div>
      </div>
      <div className="row key-container">
        {displayKey(keyIndexArr[keyIndex])}
      </div>
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h5>Key type has changed.</h5>
          <h5>After confirmation, proceed the test.</h5>
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
  );
}
