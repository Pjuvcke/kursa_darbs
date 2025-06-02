import { createSlice } from "@reduxjs/toolkit";
import {
  saveToIndexedDB,
  getFromIndexedDB,
  deleteFromIndexedDB,
} from "../utility/indexedDB";

import data from "../data";

const initialState = {
  data,
  test_data: [],
  isLoaded: false,
  lastUsed: 0,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    getData(state, action) {
      state.test_data = action.payload;
    },
    toggleLoaded(state, action) {
      state.isLoaded = action.payload;
    },
    setLastUsed(state, action) {
      state.lastUsed = action.payload;
    },
    removeLast(state) {
      state.test_data = [];
    },
  },
});

export const { getData, addData, toggleLoaded, setLastUsed, removeLast } =
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
