import "./components.css";
import Home from "./components/screens/Home/Home";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { createContext, useEffect, useState } from "react";
import Posts from "./components/screens/Posts";
import { io } from "socket.io-client";
import ChatScreen from "./components/screens/Chat/ChatScreen";

export const authContext = createContext();
export const socketContext = createContext();

function App() {
  console.log("wa lapp");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [render, setRender] = useState(true);
  // useEffect(() => {
  //   setRender(false);
  //   if (localStorage.getItem("user")) {
  //     setUser(JSON.parse(localStorage.getItem("user")));
  //     setToken(localStorage.getItem("token"));
  //   }
  // }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setToken(localStorage.getItem("token"));
      setRender(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    setRender(true);
  }, [user]);

  if (!render) {
    return <div>Loading.....</div>;
  }

  return (
    <Router>
      <authContext.Provider
        value={{
          user: { user: user, setUser: setUser },
          token: { token, token: setToken },
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login user={user} setUser={setUser} setToken={setToken} />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Posts user={user} />} />
          <Route path="/chat" element={<ChatScreen user={user} />} />
        </Routes>
      </authContext.Provider>
    </Router>
  );
}

export default App;
