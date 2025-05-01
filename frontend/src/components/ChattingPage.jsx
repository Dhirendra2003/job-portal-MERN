import { SendHorizonal } from 'lucide-react'
import assistant from "../assets/FA.png"
import moment from "moment";
import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { CHATS_END_POINT } from '@/utils/constants';
import { useSelector } from 'react-redux';


const ChattingPage = ({ currentChat, setCurrentChat, socket ,getChats}) => {
  // const [chats, setChats] = useState([
  //   { message: "How can we help you today?", fromBot: true, timestamp: 1713945600000 },
  //   { message: "I need help with my application.", fromBot: false, timestamp: 1713945660000 },
  //   { message: "Sure! Can you tell me what issue you're facing?", fromBot: true, timestamp: 1713945720000 },
  //   { message: "It's not letting me submit my resume.", fromBot: false, timestamp: 1713945780000 },
  //   { message: "Let me check that for you. One moment please.", fromBot: true, timestamp: 1713945840000 },
  //   { message: "Thanks!", fromBot: false, timestamp: 1713945900000 }
  // ]);
  const latestMessage = useRef(null);
  const textInput = useRef(null);
  const { newChat, user, isWSConneted } = useSelector((store) => store.auth);
  const [messages, setMessages] = useState(currentChat?.chats || [])
  const roomName = currentChat?.roomName || newChat?.roomName || "";

  function getTime(timestring) {
    const hmTime = new Date(timestring).toLocaleTimeString();
    const time = moment(hmTime, "HH:mm:ss").format("hh:mm A");
    return time
  }

  useEffect(() => {
    try {
      if (currentChat) {
        setMessages(currentChat?.chats || []);
      }

      const handleRoomMessage = (data) => {
        console.log("message received", data.chats);
        const { chats } = data;
        setMessages(chats);
        //updating displayed messages
        setCurrentChat((prev) => (
          {
            ...(prev || {}),
            chats: chats
          })
        );
      };
      socket?.emit('joinRoom', roomName);

      socket.on('roomMessage', handleRoomMessage);

      textInput.current.value = ""
      socket.on('error', (errorMessage => {
        console.error("Error from server:", errorMessage);
      })
      );

      socket.onAny((event, ...args) => {
        console.log(`Socket Event: ${event}`, args);
        // getChats();
      });

    } catch (error) {
      console.log(error)
    }

  }, [currentChat, socket]);


  useEffect(() => {
    console.log("messages changed:", messages)
  }, [messages]);

  const sendChatViaSocket = async (message) => {
    const input = textInput.current.value;
    if (socket) {
      socket.emit('messageToRoom', {
        roomName: currentChat?.roomName,
        sender: user.role === "recruiter" ? "recruiter" : "student",
        message: input
      });
    }
  }

  async function startChat() {
    if (textInput.current.value === "") {
      return
    }
    const input = textInput.current.value;
    console.log(input)
    setCurrentChat((prev) => (
      {
        ...(prev || {}),
        chats: [...(prev?.chats || []), {
          createdAt: new Date().toLocaleString(),
          message: `${input}`,
          sender: user.role === "recruiter" ? "recruiter" : "student",
        }]
      })
    );

    textInput.current.value = ""
    const newMessage = {
      createdAt: new Date().toLocaleString(),
      message: input,
      sender: user.role === "recruiter" ? "recruiter" : "student",
    };

    const updatedChat = {
      ...(currentChat || {}),
      chats: [...(currentChat?.chats || []), newMessage],
    };

    console.log(currentChat?.jobId?._id)
    console.log(currentChat)

    //new variables
    const jobIDcheck = newChat?.jobId ? newChat.jobId : currentChat?.jobId?._id;
    // const jobIDcheck= newChat?.jobId? newChat.jobId :currentChat?.jobId?._id;
    console.log(jobIDcheck)
    //creating a chat in db if not present
    const response = await axios.post(`${CHATS_END_POINT}/create-chat`,
      {
        "jobId": `${jobIDcheck}`,
        "companyId": newChat?.companyId || "",
        "recruiterId": newChat?.recruiterId || "",
        "applicantId": newChat?.applicantId || user?._id,
        "chats": updatedChat.chats, // <-- updated array
      },
      { withCredentials: true }
    )
    console.log(response)
  }


  useEffect(() => {
    latestMessage.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentChat]);
  return (
    <div className='h-[60vh] grid  '>


      {/* Chat Messages */}
      <div className="p-4 flex max-h-[100%] flex-col overflow-y-auto pb-48 gap-1">

        {currentChat?.chats?.length > 0 ? currentChat?.chats?.map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-2">
              {item.sender !== user.role ? <img src={assistant} className="w-6 h-6" alt="" /> : ''}
              {/*can put company logo */}
              <p

                className={`${item.sender!== user.role  ? "text-left bg-purple-200 dark:bg-purple-900" : "text-right dark:bg-neutral-700  bg-gray-100  ml-auto pr-2"} py-1 px-3 rounded-lg my-1 max-w-[70%] break-words`}
                ref={index === currentChat?.chats?.length - 1 ? latestMessage : null}
              >
                {item.message}
              </p>

            </div>
            <p className={`text-xs pl-10 pr-4 ${item.sender !== user.role  ? "text-left" : "text-right"}`}>{getTime(item.createdAt)}</p>
          </div>
        )) :
          <p className="text-center text-neutral-400 m-auto italic text-2xl font-semibold">
            No Chats Present Currently !
          </p>
        }


      </div>


      <div className="flex justify-between relative  mt-auto  p-2 gap-2">
        <input ref={textInput} type="text" className="p-2 w-full dark:bg-neutral-700  border-2 border-neutral-200 rounded-lg" />
        <button
          onClick={() => {
            if (isWSConneted) {
              sendChatViaSocket();
            } else { startChat(); }
          }}
          className="bg-[#F83002] flex items-center justify-center rounded-lg w-10 h-10"
        // onClick={() => { console.log("message sent") }}
        >
          <SendHorizonal color="white" />
        </button>
      </div>
    </div>
  )
}

export default ChattingPage