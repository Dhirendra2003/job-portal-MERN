import { ChevronLeft, SendHorizonal, X } from 'lucide-react'
import assistant from "../assets/FA.png"
import moment from "moment";
import { useEffect, useState, useRef } from "react";

const ChattingPage = () => {
  const [chats, setChats] = useState([
    { message: "How can we help you today?", fromBot: true, timestamp: 1713945600000 },
    { message: "I need help with my application.", fromBot: false, timestamp: 1713945660000 },
    { message: "Sure! Can you tell me what issue you're facing?", fromBot: true, timestamp: 1713945720000 },
    { message: "It's not letting me submit my resume.", fromBot: false, timestamp: 1713945780000 },
    { message: "Let me check that for you. One moment please.", fromBot: true, timestamp: 1713945840000 },
    { message: "Thanks!", fromBot: false, timestamp: 1713945900000 }
  ]);
  const latestMessage = useRef(null);
  const [loading, setLoading] = useState(false)

  function getTime(timestring) {
    const hmTime = new Date(timestring).toLocaleTimeString();
    const time = moment(hmTime, "HH:mm:ss").format("hh:mm A");
    return time
  }

  return (
    <div className='h-[60vh]  '>
     

      {/* Chat Messages */}
      <div className="p-4 flex max-h-[90%] flex-col overflow-y-scroll pb-48 gap-1">
        <>
          {chats.length > 0 ? chats.map((item, index) => (
            <div key={index}>
              <div className="flex items-center gap-2">
                {item.fromBot && <img src={assistant} className="w-6 h-6" alt="" />}
                {/*can put company logo */}
                <p

                  className={`${item.fromBot ? "text-left bg-purple-200" : "text-right  bg-gray-100  ml-auto pr-2"} py-1 px-3 rounded-lg my-1 max-w-[70%] break-words`}
                  ref={index === chats.length - 1 ? latestMessage : null}
                >
                  {item.message}
                </p>

              </div>
              <p className={`text-xs pl-10 pr-4 ${item.fromBot ? "text-left" : "text-right"}`}>{getTime(item.timestamp)}</p>
            </div>
          )) :
            <p className="text-center text-neutral-400 m-auto italic text-2xl font-semibold">
              No Chats Present Currently !
            </p>
          }
        </>

      </div>

      {/* Chat Options */}
      {chats.length > 0 && <div className="p-4 border-t bg-gray-100 absolute bottom-0 w-[100%] transition-all ease-in-out duration-200">

        {
          loading &&
          <div>
            <div className="text-center">
              <div role="status " className="flex gap-3 m-2 justify-center items-center">
                <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="">Loading...</span>
              </div>
            </div>
          </div>}

        <div className="flex justify-between gap-2">
          <input type="text" className="p-2 w-full  border-2 border-neutral-200 rounded-lg" />
          <button className="bg-[#F83002] flex items-center justify-center rounded-lg w-10 h-10" onClick={() => { console.log("message sent") }}>
            <SendHorizonal color="white" />
          </button>
        </div>
      </div>}
    </div>
  )
}

export default ChattingPage