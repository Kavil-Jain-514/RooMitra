import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { toast } from "react-hot-toast";

const Chat = () => {
  const { recipientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
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
      const response = await api.get(`/messages/${user._id}/${recipientId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    // Set up polling for new messages
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [recipientId]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`mb-4 ${
                message.senderId === user._id ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.senderId === user._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {message.messageText}
              </div>
            </div>
          ))}
        </div>
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
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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
