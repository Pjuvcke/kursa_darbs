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
      console.log(action.payload);
      state.data.push(action.payload);
    },
    // updateQuestionnaire: (state, action) => {
    //   const item = state.data.find((item) => item.id === action.payload.id);
    //   item.content = action.payload.content;
    // },
  },
});

export const { addQuestionnaire } = mainSlice.actions;

export default mainSlice.reducer;
