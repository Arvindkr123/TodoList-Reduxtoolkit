import { configureStore } from "@reduxjs/toolkit";
import todoSlices from "../Slices/todoSlices";

const store = configureStore({
  reducer: {
    todo: todoSlices,
  },
});

export default store;
