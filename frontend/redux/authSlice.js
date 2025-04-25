import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
  name:'auth',
  initialState:{
    loading:false ,
    chatWindow:false,
    user:null,
    newChat:null,
  },
  reducers:{
    //actions
    setLoading:(state,action)=>{
      state.loading=action.payload
    },
    setUser:(state,action)=>{
      state.user=action.payload
    },
    setChatWindow:(state,action)=>{
      state.chatWindow=action.payload
    },
    setNewChat:(state,action)=>{
      state.newChat=action.payload
    }
  }
})
export const  {setLoading,setUser,setChatWindow,setNewChat}=authSlice.actions
export default authSlice.reducer