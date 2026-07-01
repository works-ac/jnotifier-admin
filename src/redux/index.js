import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const AppStore = configureStore({
  reducer,
});

export default AppStore;
