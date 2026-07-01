import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  captchaId: null,
  captchaImage: null,
};

export const captchaSlice = createSlice({
  name: "captcha",
  initialState,
  reducers: {
    setCaptcha: (state, action) => {
      state.captchaId = action.payload.captchaId;
      state.captchaImage = action.payload.captchaImage;
    },
    clearCaptcha: (state) => {
      state.captchaId = null;
      state.captchaImage = null;
    },
  },
});

export const { clearCaptcha, setCaptcha } = captchaSlice.actions;
export default captchaSlice.reducer;
