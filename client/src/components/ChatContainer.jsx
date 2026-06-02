import { useContext, useEffect, useRef, useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ChatContainer = () => {

  const { messages, setSelectedUser, selectedUser, getMessages, sendMessage } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState("");

  //Message sending handler
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessage({ text: input.trim() });
    setInput("");
  }

  //Image sending handler
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = null; // Reset file input
    }
    reader.readAsDataURL(file);
  }


  const scrollEnd = useRef();

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }

  }, [selectedUser]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollEnd.current && messages.length > 0) {
      scrollEnd.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className='flex flex-col h-full overflow-hidden mx-2'>

      {/* HEADER */}
      <div className='flex flex-row p-4 items-center justify-between shrink-0'>
        <div className='flex flex-row items-center gap-2'>
          <img src={selectedUser.profilePic || assets.avatar_icon} className='w-12 h-12 rounded-full' />
          <h1>{selectedUser.fullName}</h1>
          {onlineUsers.includes(selectedUser._id) ? <p className='w-3 h-3 rounded-full bg-green-500/50' /> : <p className='w-3 h-3 rounded-full bg-gray-500/50' />}
        </div>

        <img src={assets.help_icon} className='w-5 h-5' />
      </div>

      <hr className="border-gray-600" />

      {/* CHAT AREA */}
      <div className='flex-1 overflow-y-auto min-h-0 px-2'>

        {messages.map((msg, index) => {

          const isMe = msg.senderId === "680f50e4f10f3cd28382ecf9";

          return (
            <div
              key={index}
              className={`flex ${msg.senderId === authUser._id ? "justify-end" : "justify-start"} my-4`}
            >

              <div className={`flex items-end gap-2 ${msg.senderId === authUser._id ? "flex-row-reverse" : ""}`}>

                {/* AVATAR */}
                <div className='text-center text-xs flex flex-col items-center gap-1'>
                  <img
                    src={msg.senderId === authUser._id ? authUser.profilePic : selectedUser.profilePic || assets.avatar_icon}
                    className='w-7 h-7 rounded-full'
                  />
                  <p className='text-gray-400'>
                    {formatMessageTime(msg.createdAt)}
                  </p>
                </div>

                {/* MESSAGE */}
                {msg.image ? (
                  <img
                    src={msg.image}
                    className='max-w-[200px] rounded-lg border border-gray-700'
                  />
                ) : (
                  <p className={`max-w-[220px] text-sm font-light rounded-lg p-2 break-words bg-violet-500/30 mb-5
              ${msg.senderId === authUser._id ? "rounded-br-none" : "rounded-bl-none"}`}>
                    {msg.text}
                  </p>

                )}

              </div>

            </div>
          )
        })}

        <div ref={scrollEnd} />
      </div>

      {/* INPUT (FIXED PROPER WAY) */}
      <div className='shrink-0 border-t border-gray-700 p-3 flex items-center gap-3'>

        <div className='flex flex-1 items-center bg-gray-100/10 px-3 py-2 rounded-full'>

          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null}
            type="text"
            placeholder="Send a message"
            className='flex-1 bg-transparent outline-none text-sm'
          />

          <input onChange={handleSendImage} id="image" type="file" hidden accept="image/png, image/jpeg" />

          <label htmlFor="image">
            <img src={assets.gallery_icon} className='w-5 cursor-pointer' />
          </label>

        </div>

        <img onClick={handleSendMessage} src={assets.send_button} className='w-7 cursor-pointer' />

      </div>

    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 h-full'>
      <img src={assets.logo_icon} className='w-20' />
      <p className='text-lg'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer