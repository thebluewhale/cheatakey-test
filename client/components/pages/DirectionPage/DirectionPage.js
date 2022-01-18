import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { attempToPostGestureResult } from "_thunks/tests";
import { TEST_TYPE_CTK_DIRECTION } from "_utils/variables";
import R from "ramda";

export default function DirectionPage() {
  const dispatch = useDispatch();
  const [gestureDirectionIndex, setGestureDirectionIndex] = useState(0);
  const [gestureDirectionArr, setGestureDirectionArr] = useState([
    0, 1, 2, 3, 4, 5, 6, 7,
  ]);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [keyIndex, setKeyIndex] = useState(0);
  const [keyIndexArr, setKeyIndexArr] = useState([0, 1, 2]);
  const [testSetCount, setTestSetCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const MAX_PROGRESS = 72;

  const shuffle = (array) => {
    for (let index = array.length - 1; index > 0; index--) {
      const randomPosition = Math.floor(Math.random() * (index + 1));
      const temp = array[index];
      array[index] = array[randomPosition];
      array[randomPosition] = temp;
    }
  };

  const displayArrow = (index) => {
    switch (index) {
      case 0:
        return <i className="material-icons large">north_west</i>;
      case 1:
        return <i className="material-icons large">north</i>;
      case 2:
        return <i className="material-icons large">north_east</i>;
      case 3:
        return <i className="material-icons large">west</i>;
      case 4:
        return <i className="material-icons large">east</i>;
      case 5:
        return <i className="material-icons large">south_west</i>;
      case 6:
        return <i className="material-icons large">south</i>;
      case 7:
        return <i className="material-icons large">south_east</i>;
    }
  };

  const displayKey = (index) => {
    switch (index) {
      case 0:
        return (
          <div
            className="col s2 offset-s1 key"
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
          ></div>
        );
      case 1:
        return (
          <div
            className="col s2 offset-s5 key"
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
          ></div>
        );
      case 2:
        return (
          <div
            className="col s2 offset-s9 key"
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
          ></div>
        );
    }
  };

  const touchStart = (e) => {
    let clientX = e.changedTouches[e.changedTouches.length - 1].clientX;
    let clientY = e.changedTouches[e.changedTouches.length - 1].clientY;
    setTouchStartX(clientX);
    setTouchStartY(clientY);
  };

  const touchEnd = (e) => {
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
        TEST_TYPE_CTK_DIRECTION
      )
    )
      .catch(R.identity())
      .then(() => {
        let tempArr = [];
        if (gestureDirectionIndex == 7) {
          if (testSetCount == 8) {
            dispatch(push("/terminate"));
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

          tempArr = [0, 1, 2, 3, 4, 5, 6, 7];
          shuffle(tempArr);
          setGestureDirectionArr(tempArr);
          setGestureDirectionIndex(0);
        } else {
          setGestureDirectionIndex(gestureDirectionIndex + 1);
        }
        setProgress(progress + 1);
      });
  };

  return (
    <div className="direction-page">
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
          <h6 className="right">{`${progress + 1} / ${MAX_PROGRESS}`}</h6>
        </div>
      </div>
      <div className="command-container">
        <h5 className="center-align">Make a gesture like the below</h5>
        <h5 className="center-align">on the purple box</h5>
        <div className="center-align">
          {displayArrow(gestureDirectionArr[gestureDirectionIndex])}
        </div>
      </div>
      <div className="row key-container">
        {displayKey(keyIndexArr[keyIndex])}
      </div>
    </div>
  );
}
