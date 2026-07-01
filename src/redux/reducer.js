import { combineReducers } from "redux";
import AuthSlice from "./slices/AuthSlice";
import CaptchaSlice from "./slices/CaptchaSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  captcha: CaptchaSlice,
});

export default rootReducer;
