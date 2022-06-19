import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatBody from "./ChatBody";
import { ChatSidebar } from "./ChatSidebar";
import { Navigate } from "react-router-dom";

const ChatScreen = ({ user }) => {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);

  function handleRoomClick(room) {
    setCurrentRoom(room);
  }

  function scroLLBottom() {
    const chatBody = document.querySelector(".chat__body");
    const height = document.querySelector(".chat__body")?.scrollHeight * 1;
    chatBody?.scrollTo(0, height);
  }
  // const [rooms, setRooms] = useState([
  //   { name: "mathematics" },
  //   { name: "physics" },
  // ]);

  // function JoinChat(endpoint, roomTitle) {
  //   if (currentEndpoint !== endpoint && socket) {
  //     socket.close();
  //   }
  //   let nsSocket = io("http://localhost:3300/" + endpoint);
  //   setSocket(nsSocket);
  //   nsSocket.emit("joinRoom", roomTitle);
  //   nsSocket.on("history", (data) => {
  //     setChat(data.chat);
  //   });
  //   nsSocket.on("serverMessage", (data) => {
  //     setChat(chat.append(data.message));
  //   });
  // }

  useEffect(() => {
    if (!socket) {
      setSocket(io("http://localhost:3300"));
      return;
    }
    console.log("socket connected");
    socket.on("history", (messages) => {
      console.log("messages history", messages);
      setChat(messages);
    });
    socket.on("messageFromServer", (newMessage) => {
      setChat((chat) => [...chat, newMessage]);
    });
  }, [socket]);

  useEffect(() => {
    if (!user) return;
    setRooms(user.rooms);
    setCurrentRoom(user.rooms[0]);
    setLoading(true);
  }, [user]);

  useEffect(() => {
    setLoading(false);
    scroLLBottom();
    console.log("his is the current chat", chat);
    console.log("current user", user);
    console.log("current room", currentRoom);
  }, [chat, rooms]);

  useEffect(() => {
    if (!currentRoom) return;
    // after the changing of the room we need to emit join room to server
    socket.emit("joinRoom", currentRoom);
    // setLoading(true);
    // async function getChat() {
    //   if (!user) return;
    //   const messages = await axios.get(
    //     `http://localhost:3300/api/chatrooms/${currentRoom._id}/messages`,
    //     {
    //       crossDomain: true,
    //     }
    //   );
    //   setChat(messages.data.data.data);
    // }
    // getChat();
  }, [currentRoom]);

  if (loading) {
    return <div className="display-5 bg-primary">Loading ......</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  // if (!user.user) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <section className="chat-section bg-dark text-white">
      <ChatSidebar rooms={rooms} handleRoomClick={handleRoomClick} />
      <ChatBody
        chat={chat}
        user={user}
        currentRoom={currentRoom}
        socket={socket}
      />
    </section>
  );
};

export default ChatScreen;
