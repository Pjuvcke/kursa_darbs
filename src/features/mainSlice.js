import { createSlice } from "@reduxjs/toolkit";
import {
  saveToIndexedDB,
  getFromIndexedDB,
  deleteFromIndexedDB,
} from "../utility/indexedDB";

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

// CRUD operations with indexedDB
export const loadDataFromIndexedDB = () => async (dispatch) => {
  const data = await getFromIndexedDB();
  dispatch(getData(data));
  dispatch(toggleLoaded(true));
};

export const saveDataToIndexedDB = (data) => async () => {
  await saveToIndexedDB(data);
};

export const deleteDataFromIndexedDB = (id) => async () => {
  await deleteFromIndexedDB(id);
};
