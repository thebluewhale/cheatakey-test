import request from "superagent";
import { handleSuccess, handleError } from "_utils/api";

export const getTestLists = () => {
  return request
    .get("/api/test/testlists")
    .then(handleSuccess)
    .catch(handleError);
};

export const postTestResult = (result) =>
  request
    .post("/api/test/result")
    .send(result)
    .then(handleSuccess)
    .catch(handleError);
