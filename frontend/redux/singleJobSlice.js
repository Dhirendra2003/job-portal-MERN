import { createSlice } from "@reduxjs/toolkit";

const singleJobSlice = createSlice({
  name: "singleJob",
  initialState: {
    job:{}
  },
  reducers: {
    //actions
    setJobDetails: (state, action) => {
      state.job = action.payload;
    },
  },
});

export const {setJobDetails}=singleJobSlice.actions;
export default singleJobSlice.reducer