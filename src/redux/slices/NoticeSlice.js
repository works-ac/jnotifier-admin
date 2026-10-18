import { createSlice } from "@reduxjs/toolkit";

const SESSION_STORAGE_KEY = "noticeDraft";

const DEFAULT_INITIAL_STATE = {
  noticeTitle: "",
  noticeDesc: "",
  tags: [],
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
    console.error("Error loading notice from sessionStorage:", error);
  }
  return DEFAULT_INITIAL_STATE;
};

const persistState = (state) => {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving notice to sessionStorage:", error);
  }
};

const removePersistedState = () => {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.error("Error removing notice from sessionStorage:", error);
  }
};

export const noticeSlice = createSlice({
  name: "notice",
  initialState: loadInitialState(),
  reducers: {
    saveNotice: (state, action) => {
      state.noticeTitle = action.payload.noticeTitle ?? "";
      state.noticeDesc = action.payload.noticeDesc ?? "";
      state.tags = action.payload.tags ?? [];
      persistState(state);
    },

    saveNoticeDescription: (state, action) => {
      state.noticeDesc = action.payload.noticeDesc ?? "";
      persistState(state);
    },

    clearNotice: (state) => {
      state.noticeTitle = "";
      state.noticeDesc = "";
      state.tags = [];
      removePersistedState();
    },
  },
});

export const { saveNotice, saveNoticeDescription, clearNotice } =
  noticeSlice.actions;
export default noticeSlice.reducer;
