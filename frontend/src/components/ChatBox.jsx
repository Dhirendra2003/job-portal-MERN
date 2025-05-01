import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, MessageCircle, X } from "lucide-react";
// import axios from 'axios'
import { setChatWindow, setIsWSConneted } from "../../redux/authSlice.js";
import { BACKEND_POINT, CHATS_END_POINT } from "@/utils/constants.js";

import ChattingPage from "./ChattingPage";
import ChattingList from "./ChattingList";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';


export default function Chatbot() {

  // const [isOpen, setChatWindow] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { chatWindow, newChat } = useSelector((store) => store.auth)
  const dispatcher = useDispatch();
  const [chatList, setChatList] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [socket, setSocket] = useState(null);

  // const createChat=(recruiterId,applicantId,companyId, jobId)=>{

  // }

  useEffect(() => {
    if (newChat) {
      setIsChatOpen(true)
    }
  }, [newChat])

  const getChats = async () => {
    const response = await axios.get(`${CHATS_END_POINT}/fetch-chats`, { withCredentials: true })
    setChatList(response.data)
    console.log("Response :", response)
  }
  useEffect(() => {
    // fetch all chats
    getChats()

  }, [])

  useEffect(() => {
    const token = Cookies.get('token');
    console.log("token: ", token)

    const socketConnection = io(`${BACKEND_POINT}`, {
      query: { token },
      transports: ['websocket'], // optional but recommended
    });
    setSocket(socketConnection);
    socketConnection.on('connect', () => {
      console.log('Connected to socket server:', socketConnection.id);
    });
    console.log("chatlist: ", chatList)
    if (chatList?.length > 0) {

      chatList?.map(chat => {
        console.log("chat from map", chat?.roomName)
        socketConnection.emit('joinRoom', chat?.roomName);
      })
      dispatcher(setIsWSConneted(true));
      console.log('web sockets connected true')
    }
    else {
      dispatcher(setIsWSConneted(false));
      console.log('web sockets connected false')
    }

  }, [chatList])


  return (
    <>
      {createPortal(
        <>
          {/* Floating Chat Button */}
          <button
            onClick={() => dispatcher(setChatWindow(true))}
            className=" bg-[] fixed z-50 bottom-5 right-5  text-white p-3 rounded-full hover:bg-[#502897] transition"
          >
            <MessageCircle size={24} color="white" />
          </button>

          {chatWindow && (
            <div className="fixed bottom-20 right-5 w-96 bg-white dark:bg-neutral-900 drop-shadow-xl border-[2px] border-neutral-300  rounded-lg overflow-hidden z-50">
              {isChatOpen ? <div className="bg-[#2C89FD] text-white p-4 flex justify-between">
                <button onClick={() => setIsChatOpen(false)} className="text-white">
                  <ChevronLeft />
                </button>
                <h2 className="text-lg font-bold capitalize">{newChat ? (newChat?.name) : currentChat?.companyId?.name}</h2>
                <button onClick={() => dispatcher(setChatWindow(false))} className="text-white">
                  <X />
                </button>
              </div>
                :
                <div className="bg-[#2C89FD] text-white p-4 flex justify-between">
                  <h2 className="text-lg font-bold">Chats </h2>
                  <button onClick={() => dispatcher(setChatWindow(false))} className="text-white">
                    <X />
                  </button>
                </div>
              }
              {isChatOpen ? <ChattingPage getChats={getChats} currentChat={currentChat} setCurrentChat={setCurrentChat} socket={socket} /> :
                <ChattingList setCurrentChat={setCurrentChat} chatList={chatList} isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} socket={socket} />
              }
            </div>
          )}
        </>,
        document.body
      )}
    </>
  );
}
