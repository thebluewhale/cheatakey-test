import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { attempToPostGestureResult } from "_thunks/tests";
import { TEST_TYPE_CTK_VOWEL_KEY_TYPE } from "_utils/variables";
import { ResponsivePie } from "@nivo/pie";
import R from "ramda";
import M from "materialize-css";

export default function CallibrationPage() {
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
  const [isTerminated, setIsTerminated] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [callibrationData, setCallibrationData] = useState([
    { min: 0, max: 0 }, // for a
    { min: 0, max: 0 }, // for e
    { min: 0, max: 0 }, // for i
    { min: 0, max: 0 }, // for o
    { min: 0, max: 0 }, // for u
  ]);
  const MAX_PROGRESS = 15;
  const ALPHABET_IDNEX_A = 0;
  const ALPHABET_IDNEX_E = 1;
  const ALPHABET_IDNEX_I = 2;
  const ALPHABET_IDNEX_O = 3;
  const ALPHABET_IDNEX_U = 4;
  const GESTURE_DEGREE_DATA = [
    { start: 240, end: 315 }, // for a
    { start: 45, end: 120 }, // for e
    { start: 315, end: 45 }, // for i
    { start: 180, end: 240 }, // for o
    { start: 120, end: 180 }, // for u
  ];

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
      case ALPHABET_IDNEX_A:
        return (
          <div
            className="col s2 offset-s1 key key-normal"
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
          ></div>
        );
      case ALPHABET_IDNEX_E:
        return (
          <div
            className="col s2 offset-s5 key key-normal"
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
          ></div>
        );
      case ALPHABET_IDNEX_I:
        return (
          <div
            className="col s2 offset-s9 key key-normal"
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
          ></div>
        );
    }
  };

  const PieChartGenerator = (data) => {
    callibrationData.map((item) => {
      console.log(item.min, item.max);
    });
    return (
      <ResponsivePie
        data={data}
        margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
        innerRadius={0.05}
        padAngle={2}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "pastel2" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={0}
        arcLinkLabelsDiagonalLength={10}
        arcLinkLabelsStraightLength={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ theme: "grid.line.stroke" }}
        arcLinkLabel={(item) => `${item.label}`}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        endAngle={360}
        startAngle={-45 - callibrationData[ALPHABET_IDNEX_I].min}
        arcLabel={(item) =>
          `${
            GESTURE_DEGREE_DATA[item.id].start - callibrationData[item.id].min
          }° ~ ${
            GESTURE_DEGREE_DATA[item.id].end - callibrationData[item.id].max
          }°`
        }
      />
    );
  };

  const processCallibrationData = (alphabetIndex, degree) => {
    let cbd = callibrationData;
    switch (alphabetIndex) {
      case ALPHABET_IDNEX_A: // for a : 240 - 315
        if (degree < 240 && degree > 195) {
          console.log("min++");
          cbd[ALPHABET_IDNEX_A].min++;
          cbd[ALPHABET_IDNEX_O].max--;
        } else if (degree > 315 && degree < 360) {
          console.log("max++");
          cbd[ALPHABET_IDNEX_A].max++;
          cbd[ALPHABET_IDNEX_I].min--;
        }
        setCallibrationData(cbd);
        return;
      case ALPHABET_IDNEX_E: // for e : 45 - 120
        if (degree < 45 && degree > 90) {
          console.log("min++");
          cbd[ALPHABET_IDNEX_E].min++;
          cbd[ALPHABET_IDNEX_I].max--;
        } else if (degree > 120 && degree < 165) {
          console.log("max++");
          cbd[ALPHABET_IDNEX_E].max++;
          cbd[ALPHABET_IDNEX_U].min--;
        }
        setCallibrationData(cbd);
        return;
      case ALPHABET_IDNEX_I: //for i : 315-45
        if (degree < 315 && degree > 270) {
          console.log("min++");
          cbd[ALPHABET_IDNEX_I].min++;
          cbd[ALPHABET_IDNEX_A].max--;
        } else if (degree > 45 && degree < 90) {
          console.log("max++");
          cbd[ALPHABET_IDNEX_I].max++;
          cbd[ALPHABET_IDNEX_E].min--;
        }
        setCallibrationData(cbd);
        return;
      case ALPHABET_IDNEX_O: //for o : 180 - 240
        if (degree < 180 && degree > 135) {
          console.log("min++");
          cbd[ALPHABET_IDNEX_O].min++;
          cbd[ALPHABET_IDNEX_U].max--;
        } else if (degree > 240 && degree < 285) {
          console.log("max++");
          cbd[ALPHABET_IDNEX_O].max++;
          cbd[ALPHABET_IDNEX_A].min--;
        }
        setCallibrationData(cbd);
        return;
      case ALPHABET_IDNEX_U: //for u : 120 - 180
        if (degree < 120 && degree > 75) {
          console.log("min++");
          cbd[ALPHABET_IDNEX_U].min++;
          cbd[ALPHABET_IDNEX_E].max--;
        } else if (degree > 180 && degree < 225) {
          console.log("max++");
          cbd[ALPHABET_IDNEX_U].max++;
          cbd[ALPHABET_IDNEX_O].min--;
        }
        setCallibrationData(cbd);
        return;
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

    // modify submittedAngle. 12 o'clock will be 0 deg, 3 o'clock will be 90 deg.
    if (submittedAngle < 0.0) submittedAngle += 360.0;
    submittedAngle += 90;
    submittedAngle %= 360;
    processCallibrationData(
      gestureDirectionArr[gestureDirectionIndex],
      submittedAngle
    );

    let tempArr = [];
    if (gestureDirectionIndex == 4) {
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
  };

  useEffect(() => {
    M.Modal.init(document.querySelectorAll(".modal"));
  }, []);

  useEffect(() => {
    if (progress == MAX_PROGRESS) {
      setIsTerminated(true);
      setChartData([
        {
          id: ALPHABET_IDNEX_I,
          label: "i",
          value:
            90 +
            callibrationData[ALPHABET_IDNEX_I].min +
            callibrationData[ALPHABET_IDNEX_I].max,
          color: "hsl(206, 70%, 50%)",
        },
        {
          id: ALPHABET_IDNEX_E,
          label: "e",
          value:
            75 +
            callibrationData[ALPHABET_IDNEX_E].min +
            callibrationData[ALPHABET_IDNEX_E].max,
          color: "hsl(168, 70%, 50%)",
        },
        {
          id: ALPHABET_IDNEX_U,
          label: "u",
          value:
            60 +
            callibrationData[ALPHABET_IDNEX_U].min +
            callibrationData[ALPHABET_IDNEX_U].max,
          color: "hsl(97, 70%, 50%)",
        },

        {
          id: ALPHABET_IDNEX_O,
          label: "o",
          value:
            60 +
            callibrationData[ALPHABET_IDNEX_O].min +
            callibrationData[ALPHABET_IDNEX_O].max,
          color: "hsl(206, 70%, 50%)",
        },
        {
          id: ALPHABET_IDNEX_A,
          label: "a",
          value:
            75 +
            callibrationData[ALPHABET_IDNEX_A].min +
            callibrationData[ALPHABET_IDNEX_A].max,
          color: "hsl(225, 70%, 50%)",
        },
      ]);
    }
  }, [progress]);

  return isTerminated ? (
    <div className="row callibration-page">
      <div className="col s12">
        <div className="card-panel grey lighten-3">
          <h5 className="purple-text">Thank you.</h5>
          <h6 className="purple-text">Callibration is done.</h6>
        </div>
      </div>
      <div className="col s12">
        <div className="chart-container">{PieChartGenerator(chartData)}</div>
      </div>
    </div>
  ) : (
    <div className="callibration-page">
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
        <div className="center-align orange-text">
          {displayText(gestureDirectionArr[gestureDirectionIndex])}
        </div>
      </div>
      <div className="row key-container">
        {displayKey(keyIndexArr[keyIndex])}
      </div>
    </div>
  );
}
