import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

export default function GuidePage() {
  const variables = useSelector((state) => state.tests.variables);
  const [testType, setTestType] = useState("");

  const convertTestTypeToTitle = (testType) => {
    switch (testType) {
      case TEST_TYPE_PART_B_QWERTY:
        return "Part B : First QWERTY test";
      case TEST_TYPE_PART_B_GBOARD:
        return "Part B : First Gboard test";
      case TEST_TYPE_PART_C_CHEATAKEY:
        return "Part C : First new keyboard test";
      case TEST_TYPE_PART_D_CHEATAKEY:
        return "PART D : New keyboard practice";
      case TEST_TYPE_PART_E_CHEATAKEY:
        return "PART E : Final new keyboard test";
      case TEST_TYPE_PART_E_CHEATAKEY_ONEHAND:
        return "PART E : One hand new keyboard test";
      case TEST_TYPE_PART_E_QWERTY_ONEHAND:
        return "PART E : One hand QWERTY test";
      case TEST_TYPE_PART_E_GBOARD_ONEHAND:
        return "PART E : One hand Gboard test";
      default:
        "ERROR. notice to staff";
    }
  };

  const convertTestTypeToDetail = (testType) => {
    switch (testType) {
      case TEST_TYPE_PART_B_QWERTY:
      case TEST_TYPE_PART_B_GBOARD:
      case TEST_TYPE_PART_C_CHEATAKEY:
      case TEST_TYPE_PART_E_CHEATAKEY:
      case TEST_TYPE_PART_E_CHEATAKEY_ONEHAND:
      case TEST_TYPE_PART_E_QWERTY_ONEHAND:
      case TEST_TYPE_PART_E_GBOARD_ONEHAND:
        return "10 sentences will be presented.";
      case TEST_TYPE_PART_D_CHEATAKEY:
        return "Practice 20 minutes";
      default:
        "ERROR. notice to staff";
    }
  };

  useEffect(() => {
    setTestType(variables.testType);
  }, []);

  return (
    <div className="row">
      <div className="col s12">
        <Link to="/test">
          <div className="card-panel purple lighten-5">
            <h6 className="purple-text">
              <b>[{convertTestTypeToTitle(testType)}] will be started. </b>
            </h6>
            <h6 className="purple-text">{convertTestTypeToDetail(testType)}</h6>
            <h6 className="purple-text">Click to start test.</h6>
          </div>
        </Link>
      </div>
    </div>
  );
}
