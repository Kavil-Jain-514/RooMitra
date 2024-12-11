import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { toast } from "react-hot-toast";

const Chat = () => {
  const { recipientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await api.post("/messages", {
        senderId: user._id,
        recipientId,
        messageText: newMessage,
      });
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const fetchMessages = async () => {
    try {
      // Get conversation for both users
      const response = await api.get(`/messages/${user._id}/${recipientId}`);

      // Sort messages by sentAt timestamp in ascending order
      const sortedMessages = response.data.sort(
        (a, b) => new Date(a.sentAt) - new Date(b.sentAt)
      );
      console.log(sortedMessages);

      setMessages(sortedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchRecipientName = async () => {
    try {
      const userType =
        user.userType === "RoomSeeker" ? "roomprovider" : "roomseeker";
      const response = await api.get(`/users/name/${userType}/${recipientId}`);
      setRecipientName(`${response.data.firstName} ${response.data.lastName}`);
    } catch (error) {
      console.error("Error fetching recipient name:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchRecipientName();
    // Set up polling for new messages
    const interval = setInterval(fetchMessages, 20000);
    return () => clearInterval(interval);
  }, [recipientId]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">{recipientName || "Chat"}</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`mb-4 ${
                message.senderId === user._id ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg max-w-[70%] ${
                  message.senderId === user._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                <div className="text-xs opacity-75 mb-1">
                  {message.senderId === user._id ? "You" : recipientName}
                </div>
                <p>{message.messageText}</p>
                <span className="text-xs opacity-75">
                  {new Date(message.sentAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border rounded-lg p-2"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
