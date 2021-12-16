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

// export const dispatchError = dispatch => res => {
//     if (res.status == 401) {

//     }
// }
