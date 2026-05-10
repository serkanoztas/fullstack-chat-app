import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    //check user auth
    const checkAuth = async () => {
        try {
            const { data } = await axios.get("/api/auth/check");
            if (data.success) {
                setAuthUser(data.user);
                connectSocket(data.user);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //Login and signup function 
    const login = async (state, credantials) => {
        try {
            const { data } = await axios.post(`/api/auth/${state}`, credantials);
            if (data.success) {
                setAuthUser(data.user);
                connectSocket(data.token);
                axios.defaults.headers.common["token"] = data.token;
                setToken(data.token);
                localStorage.setItem("token", data.token);
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    //loguot function
    const logout = async () => {
        localStorage.removeItem("token");
        setAuthUser(null);
        setOnlineUsers(null);
        axios.defaults.headers.common["token"] = null;
        toast.success("Logged Out Successfully");
        socket.disconnect();

    }

    const updateProfile = async (body) => {
        try {
            const { data } = await axios.put("/api/auth/update-profil", body);
            if (data.success) {
                setAuthUser(data.user);
                toast.success("Profile updated successfully");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //socket connection to handle online users
    const connectSocket = (userData) => {
        if (!userData || socket?.connected) return;
        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id
            }
        })
        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds) => {
            setOnlineUser(userIds);
        })
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["token"] = token;
        }
        checkAuth();
    }, [])

    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login, 
        logout,
        updateProfile

    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}