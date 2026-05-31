import User from "../models/User.js";
import Message from "../models/Message.js"
import cloudinary from "../lib/cloudinary.js"
import { io, userSocketMap } from "../server.js"

export const getUserForSidebar = async (req, res) => {

    try {
        const userId = req.user._id;

        const filteredUsers = await User.find({
            _id: { $ne: userId }
        }).select("-password");

        const unSeenMessages = {};

        await Promise.all(
            filteredUsers.map(async (user) => {
                const messages = await Message.find({
                    senderId: user._id,
                    receiverId: userId,
                    seen: false
                });

                if (messages.length > 0) {
                    unSeenMessages[user._id] = messages.length;
                }
            })
        );

        res.json({
            success: true,
            users: filteredUsers,
            unSeenMessages
        });


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};


//get all messages for seleceted user
export const getMessages = async (req, res) => {
    try {
        const { id: selectedUserId } = req.params;
        const myId = req.user._id;
        //benim karşıya ve karşının bana gönderdiği mesajlar ayrı olarak arraye  aldık
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: selectedUserId },
                { senderId: selectedUserId, receiverId: myId }
            ]
        })
        await Message.updateMany({ senderId: selectedUserId, receiverId: myId }, { seen: true });
        res.json({ success: true, messages });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//mark message as seen using message id
export const markMessageAsSeen = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndUpdate(id, { seen: true });
        res.json({ success: true });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//send message
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const { text, image } = req.body;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        const receiverSocketId = userSocketMap(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.json({ success: true, newMessage })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }

}