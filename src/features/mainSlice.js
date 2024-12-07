import { createSlice } from "@reduxjs/toolkit";
import { saveToIndexedDB, getFromIndexedDB } from "../utility/indexedDB";

import data from "../data";

const initialState = {
  user: "Guest",
  data,
  test_data: [],
  isLoaded: false,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    addQuestionnaire: (state, action) => {
      console.log("add: ", action.payload);
      state.test_data.push(action.payload);
    },
    // updateQuestionnaire: (state, action) => {
    //   const item = state.data.find((item) => item.id === action.payload.id);
    //   item.content = action.payload.content;
    // },
    getData(state, action) {
      state.test_data = action.payload;
    },
    toggleLoaded(state, action) {
      state.isLoaded = action.payload;
    },
  },
});

export const { addQuestionnaire, getData, addData, toggleLoaded } =
  mainSlice.actions;

export default mainSlice.reducer;

// Darbošanās ar indexedDB
export const loadDataFromIndexedDB = () => async (dispatch) => {
  const data = await getFromIndexedDB();
  dispatch(getData(data));
  dispatch(toggleLoaded(true));
};

export const saveDataToIndexedDB = (data) => async () => {
  await saveToIndexedDB(data);
};
