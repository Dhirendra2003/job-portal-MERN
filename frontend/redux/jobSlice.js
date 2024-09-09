import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    searchedQuery:"",
    filterJobs:{
      location :"",
      industry:"",
      salary:""
    }
  },
  reducers: {
    //actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSearchedQuery:(state,action) => {
      state.searchedQuery = action.payload;
  },
  setFilterJobs:(state,action) => {
    state.filterJobs = action.payload;
}
  },
});

export const {setAllJobs,setSearchedQuery,setFilterJobs}=jobSlice.actions;
export default jobSlice.reducer