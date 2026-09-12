import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  applicationStartDate: null,
  applicationEndDate: null,
  tags: [],
  applyLink: "",
  shortDescription: "",
  advNo: "",
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    saveJob: (state, action) => {
      state.title = action.payload.title;
      state.applicationStartDate = action.payload.applicationStartDate;
      state.applicationEndDate = action.payload.applicationEndDate;
      state.tags = action.payload.tags;
      state.applyLink = action.payload.applyLink;
      state.shortDescription = action.payload.shortDescription;
      state.advNo = action.payload.advNo;
    },

    clearJob: (state) => {
      state.title = "";
      state.applicationStartDate = null;
      state.applicationEndDate = null;
      state.tags = [];
      state.applyLink = "";
      state.shortDescription = "";
      state.advNo = "";
    },
  },
});

export const { saveJob, clearJob } = jobSlice.actions;
export default jobSlice.reducer;
