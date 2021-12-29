import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  TEST_TYPE_QWERTY,
  TEST_TYPE_CTK_FIRST,
  TEST_TYPE_CTK_PRACTICE,
  TEST_TYPE_CTK_FINAL,
} from "_utils/variables";

export default function GuidePage() {
  const variables = useSelector((state) => state.tests.variables);
  const [testType, setTestType] = useState("");

  const convertTestTypeToTitle = (testType) => {
    switch (testType) {
      case TEST_TYPE_QWERTY:
        return "QWERTY Test";
      case TEST_TYPE_CTK_FIRST:
        return "First CheatA-Key Test";
      case TEST_TYPE_CTK_PRACTICE:
        return "CheatA-Key Practice";
      case TEST_TYPE_CTK_FINAL:
        return "Final CheatA-Key Test";
      default:
        "ERROR";
    }
  };

  const convertTestTypeToDetail = (testType) => {
    switch (testType) {
      case TEST_TYPE_QWERTY:
      case TEST_TYPE_CTK_FIRST:
      case TEST_TYPE_CTK_FINAL:
        return "10 sentences will be presented.";
      case TEST_TYPE_CTK_PRACTICE:
        return "5 sets of 20 sentences in each set. (100 sentences)";
      default:
        "ERROR";
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
