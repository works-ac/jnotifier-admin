import { createSlice } from "@reduxjs/toolkit";

const SESSION_STORAGE_KEY = "jobDraft";

const DEFAULT_INITIAL_STATE = {
  title: "",
  applicationStartDate: null,
  applicationEndDate: null,
  tags: [],
  applyLink: "",
  shortDescription: "",
  advNo: "",
};

const loadInitialState = () => {
  try {
    const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (saved) {
      return {
        ...DEFAULT_INITIAL_STATE,
        ...JSON.parse(saved),
      };
    }
  } catch (error) {
    console.error("Error loading job from sessionStorage:", error);
  }
  return DEFAULT_INITIAL_STATE;
};

const persistState = (state) => {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving job to sessionStorage:", error);
  }
};

const removePersistedState = () => {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.error("Error removing job from sessionStorage:", error);
  }
};

export const jobSlice = createSlice({
  name: "job",
  initialState: loadInitialState(),
  reducers: {
    saveJob: (state, action) => {
      state.title = action.payload.title;
      state.applicationStartDate = action.payload.applicationStartDate;
      state.applicationEndDate = action.payload.applicationEndDate;
      state.tags = action.payload.tags;
      state.applyLink = action.payload.applyLink;
      state.shortDescription = action.payload.shortDescription;
      state.advNo = action.payload.advNo;
      persistState(state);
    },

    saveJobDescription: (state, action) => {
      state.shortDescription = action.payload.shortDescription;
      persistState(state);
    },

    clearJob: (state) => {
      state.title = "";
      state.applicationStartDate = null;
      state.applicationEndDate = null;
      state.tags = [];
      state.applyLink = "";
      state.shortDescription = "";
      state.advNo = "";
      removePersistedState();
    },
  },
});

export const { saveJob, saveJobDescription, clearJob } = jobSlice.actions;
export default jobSlice.reducer;
