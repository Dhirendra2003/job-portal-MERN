import { createSlice } from "@reduxjs/toolkit";

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    allApplications: [],
  },
  reducers: {
    //actions
    setAllApplications: (state, action) => {
      state.allApplications= action.payload;
    },
  },
});

export const {setAllApplications}=applicationsSlice.actions;
export default applicationsSlice.reducer