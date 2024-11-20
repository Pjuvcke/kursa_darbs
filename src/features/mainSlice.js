import { createSlice } from "@reduxjs/toolkit";
import data from "../data";

const initialState = {
  user: "Guest",
  data,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    addQuestionnaire: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addQuestionnaire } = mainSlice.actions;

export default mainSlice.reducer;
