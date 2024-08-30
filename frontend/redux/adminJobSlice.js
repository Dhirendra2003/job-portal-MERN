import { createSlice } from "@reduxjs/toolkit";

const adminJobSlice = createSlice({
  name: "adminJob",
  initialState: {
    adminJobs: [],
  },
  reducers: {
    //actions
    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
    },
  },
});

export const {setAdminJobs}=adminJobSlice.actions;
export default adminJobSlice.reducer