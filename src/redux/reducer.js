import { combineReducers } from "redux";
import AuthSlice from "./slices/AuthSlice";
import CaptchaSlice from "./slices/CaptchaSlice";
import JobSlice from "./slices/JobSlice";
import FileUploadSlice from "./slices/FileUploadSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  captcha: CaptchaSlice,
  job: JobSlice,
  file: FileUploadSlice,
});

export default rootReducer;
