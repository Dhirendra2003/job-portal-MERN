import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
  name:'auth',
  initialState:{
    loading:false ,
    chatWindow:false,
    user:null,
    newChat:null,
    isWSConneted:false,
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
    },
    setIsWSConneted:(state,action)=>{
      state.isWSConneted=action.payload
    }
  }
})
export const  {setLoading,setUser,setChatWindow,setNewChat,setIsWSConneted}=authSlice.actions
export default authSlice.reducer