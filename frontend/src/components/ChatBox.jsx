import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, MessageCircle, X } from "lucide-react";
import axios from 'axios'


import ChattingPage from "./ChattingPage";
import ChattingList from "./ChattingList";

export default function Chatbot() {

  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);



  return (
    <>
      {createPortal(
        <>
          {/* Floating Chat Button */}
          <button
            onClick={() => setIsOpen(true)}
            className=" bg-[#6A38C2] fixed z-50 bottom-5 right-5 bg- text-white p-3 rounded-full hover:bg-[#502897] transition"
          >
            <MessageCircle size={24} color="white" />
          </button>

          {isOpen && (
            <div className="fixed bottom-20 right-5 w-96 bg-white drop-shadow-xl border-[2px] border-neutral-300 rounded-lg overflow-hidden z-50">
              {isChatOpen ? <div className="bg-[#6A38C2] text-white p-4 flex justify-between">
                <button onClick={() => setIsChatOpen(false)} className="text-white">
                  <ChevronLeft />
                </button>
                <h2 className="text-lg font-bold">company name</h2>
                <button onClick={() => setIsOpen(false)} className="text-white">
                  <X />
                </button>
              </div>
                :
                <div className="bg-[#6A38C2] text-white p-4 flex justify-between">
                  <h2 className="text-lg font-bold">Chats </h2>
                  <button onClick={() => setIsOpen(false)} className="text-white">
                  <X />
                </button>
                </div>
              }
              {isChatOpen ? <ChattingPage /> :
                <ChattingList isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen}/>}
            </div>
          )}
        </>,
        document.body
      )}
    </>
  );
}
