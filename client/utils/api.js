import { push } from "connected-react-router";
import { store as RNC } from "react-notifications-component";

export const handleSuccess = (res) => res.body;

export const handleError = (error) => {
  if (error.response) {
    throw error.response;
  } else {
    const response = {
      status: 500,
      body: { message: "Internal server error" },
    };
    throw response;
  }
};

export const dispatchError = (dispatch) => (res) => {
  RNC.addNotification({
    title: `Error: ${res.status}`,
    message: res.body.message,
    type: "danger",
    container: "top-right",
    animationIn: ["animated", "fadeInRight"],
    animationOut: ["animated", "fadeOutRight"],
    dismiss: { duration: 2000 },
  });
  throw res;
};
