import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const { axios, socket } = useContext(AuthContext);

    // get users for sidebar
    const getUsers = async () => {
        try {
            const { data } = await axios.post("/api/messages/users");
          
            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unSeenMessages);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    // get messages for selected user
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.post(`/api/messages/${userId}`);
            if (data.success) {
                setMessages(data.messages);
            }
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }

    // send message to selected user
    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            console.log("API DATA:", data);
            if (data.success) {
                setMessages(prev => [...prev, data.newMessage]);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    // subscribe to new messages using socket.io
    const subscribeToMessages = () => {
        if (!socket) return;
        socket.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                setMessages((prev) => [...prev, newMessage]);
                axios.post(`/api/messages/mark/${newMessage._id}`);
            }
            else {
                setUnseenMessages((prev) => ({
                    ...prev,
                    [newMessage.senderId]: prev[newMessage.senderId] ? prev[newMessage.senderId] + 1 : 1
                }))
            }
        });
    }

    // unsubscribe from messages when component unmounts
    const unsubscribeFromMessages = () => {
        if (socket) {
            socket.off("newMessage");
        }
    }

    useEffect(() => {
        subscribeToMessages();
        return () => {
            unsubscribeFromMessages();
        }
    }, [socket, selectedUser])

    const value = {
        messages,
        users,
        selectedUser,
        unseenMessages,
        setSelectedUser,
        getUsers,
        getMessages,
        sendMessage,
        setUnseenMessages,
        setMessages,
        setUsers
    }
    return (
        < ChatContext.Provider value={value} >
            {children}
        </ ChatContext.Provider >

    )
}

