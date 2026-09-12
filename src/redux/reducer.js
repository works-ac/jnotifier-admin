import { combineReducers } from "redux";
import AuthSlice from "./slices/AuthSlice";
import CaptchaSlice from "./slices/CaptchaSlice";
import JobSlice from "./slices/JobSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  captcha: CaptchaSlice,
  job: JobSlice,
});

export default rootReducer;
