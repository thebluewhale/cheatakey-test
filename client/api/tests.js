import request from "superagent";
import { handleSuccess, handleError } from "_utils/api";

export const getTestLists = () =>
  request.get("/api/testlists").then(handleSuccess).catch(handleError);

export const postTestResult = (result) =>
  request.post("/api/result").then(handleSuccess).catch(handleError);
