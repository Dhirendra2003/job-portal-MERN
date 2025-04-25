import React, { useState } from 'react'

const ChattingList = ({isChatOpen,setIsChatOpen,chatList,setCurrentChat}) => {
  // const [chatList, setChatList] = useState([
  //   { company: "TATA", logo: "https://placehold.co/30x30", unreadmsg: Math.random() < 0.5 },
  //   { company: "Infosys", logo: "https://placehold.co/30x30", unreadmsg: Math.random() < 0.5 },
  //   { company: "Wipro", logo: "https://placehold.co/30x30", unreadmsg: Math.random() < 0.5 },
  //   { company: "Google", logo: "https://placehold.co/30x30", unreadmsg: Math.random() < 0.5 },
  //   { company: "Microsoft", logo: "https://placehold.co/30x30", unreadmsg: Math.random() < 0.5 },
  //   { company: "Amazon", logo: "https://placehold.co/30x30", unreadmsg: Math.random() < 0.5 },
  //   { company: "TATA", logo: "https://placehold.co/30x30", unreadmsg: Math.random() < 0.5 },
  //   { company: "Infosys", logo: "https://placehold.co/30x30", unreadmsg: Math.random() < 0.5 },
  //   { company: "Wipro", logo: "https://placehold.co/30x30", unreadmsg: Math.random() < 0.5 },
  //   { company: "Google", logo: "https://placehold.co/30x30", unreadmsg: Math.random() < 0.5 },
  //   { company: "Microsoft", logo: "https://placehold.co/30x30", unreadmsg: Math.random() < 0.5 },
  //   { company: "Amazon", logo: "https://placehold.co/30x30", unreadmsg: Math.random() < 0.5 }
  // ])
  return (
    <div className="pt-3 flex flex-col h-[60vh]  overflow-auto ">
      {chatList?.length>0 && chatList.map((item,index)=>{
        return (
          <div onClick={()=>{setIsChatOpen(true);setCurrentChat(item)}} key={index} className={`grid grid-cols-3 p-4 h-20 border-neutral-300 border-b-[1px] bg-${item?.unreadmsg? "purple-100":'white'} items-center `}>
            <img src={item?.companyId?.logo} alt="" className='m-auto shadow-md rounded-lg w-12 h-12 ' />
            <h3 className='col-span-2 pl-3 text-xl flex'>{item?.companyId?.name}
              {/* {item.unreadmsg &&<span className='text-right ml-auto text-red-500 text-3xl'>•</span>} */}
              {/* unread messages logic to be implemented later */}
              </h3>
          </div>
        )
      })}
    </div>
  )
}

export default ChattingList