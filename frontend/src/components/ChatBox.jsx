import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, MessageCircle, X } from "lucide-react";
// import axios from 'axios'
import { setChatWindow } from "../../redux/authSlice.js";
import { CHATS_END_POINT } from "@/utils/constants.js";

import ChattingPage from "./ChattingPage";
import ChattingList from "./ChattingList";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Chatbot() {

  // const [isOpen, setChatWindow] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
const {chatWindow,newChat}=useSelector((store) => store.auth)
const dispatcher=useDispatch();
const [chatList,setChatList]=useState(null);
const [currentChat ,setCurrentChat]=useState(null);

const createChat=(recruiterId,applicantId,companyId, jobId)=>{

}

useEffect(()=>{
if(newChat){
  setIsChatOpen(true)
}
},[newChat])

useEffect(()=>{
  // fetch all chats
  const getChats=async()=>{
    const response = await axios.get(`${CHATS_END_POINT}/fetch-chats`,{withCredentials:true})
    setChatList(response.data)
    console.log(response)
  }
  getChats()
},[])

  return (
    <>
      {createPortal(
        <>
          {/* Floating Chat Button */}
          <button
            onClick={() => dispatcher(setChatWindow(true))}
            className=" bg-[#6A38C2] fixed z-50 bottom-5 right-5 bg- text-white p-3 rounded-full hover:bg-[#502897] transition"
          >
            <MessageCircle size={24} color="white" />
          </button>

          {chatWindow && (
            <div className="fixed bottom-20 right-5 w-96 bg-white drop-shadow-xl border-[2px] border-neutral-300 rounded-lg overflow-hidden z-50">
              {isChatOpen ? <div className="bg-[#6A38C2] text-white p-4 flex justify-between">
                <button onClick={() => setIsChatOpen(false)} className="text-white">
                  <ChevronLeft />
                </button>
                <h2 className="text-lg font-bold">{newChat?(newChat?.name):""}</h2>
                <button onClick={() => dispatcher(setChatWindow(false))} className="text-white">
                  <X />
                </button>
              </div>
                :
                <div className="bg-[#6A38C2] text-white p-4 flex justify-between">
                  <h2 className="text-lg font-bold">Chats </h2>
                  <button onClick={() => dispatcher(setChatWindow(false))} className="text-white">
                  <X />
                </button>
                </div>
              }
              {isChatOpen ? <ChattingPage currentChat={currentChat}/> :
                <ChattingList setCurrentChat={setCurrentChat} chatList={chatList} isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen}/>}
            </div>
          )}
        </>,
        document.body
      )}
    </>
  );
}
