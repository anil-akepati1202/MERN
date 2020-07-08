import { REGISTER_SUCESS, REGISTER_FAIL } from "../actions/types";

const intialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
};

export default function (state = intialState, action) {
  const { type, payLoad } = action;

  switch (type) {
    case REGISTER_SUCESS:
      localStorage.setItem("token", payLoad.token);
      return {
        ...state,
        ...payLoad,
        isAuthenticated: true,
        isLoading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
