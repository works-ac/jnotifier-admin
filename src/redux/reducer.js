import { combineReducers } from "redux";
import AuthSlice from "./slices/AuthSlice";
import CaptchaSlice from "./slices/CaptchaSlice";
import JobSlice from "./slices/JobSlice";
import FileUploadSlice from "./slices/FileUploadSlice";
import NoticeSlice from "./slices/NoticeSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  captcha: CaptchaSlice,
  job: JobSlice,
  file: FileUploadSlice,
  notice: NoticeSlice,
});

export default rootReducer;
