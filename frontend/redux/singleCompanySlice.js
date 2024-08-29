import { createSlice } from "@reduxjs/toolkit";

const singleCompanySlice = createSlice({
  name: "singleCompany",
  initialState: {
    company:{}
  },
  reducers: {
    //actions
    setCompanyDetails: (state, action) => {
      state.company = action.payload;
    },
  },
});

export const {setCompanyDetails}=singleCompanySlice.actions;
export default singleCompanySlice.reducer