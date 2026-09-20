import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDisabled: false,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    toggleState: (state) => {
      state.isDisabled = !state.isDisabled;
    },
  },
});

export const { toggleState } = fileSlice.actions;
export default fileSlice.reducer;
