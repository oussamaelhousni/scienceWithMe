import React from "react";

const ChatBody = ({ chat, user, socket, currentRoom }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submited");
    const text = document.querySelector("#send").value;
    const message = {
      room: currentRoom._id,
      user: user._id,
      content: text,
    };
    if (!text) return;
    console.log("afterreturn");
    document.querySelector("#send").value = "";
    socket.emit("messageToServer", message);
  };
  return (
    <main className="chat__body bg-warning position-relative">
      {chat.length === 0
        ? "No  chat to show"
        : chat.map((message) => {
            return (
              <div
                className={`message rounded w-75 bg-light ${
                  user._id === message.user._id ? "my-message" : ""
                }`}
              >
                <div className="message_title fw-bold text-primary">
                  {message.user._id === user._id
                    ? "You"
                    : message.user.first_name + " " + message.user.second_name}
                </div>
                <p className="lead text-dark fs-6 my-message">
                  {message.content}
                </p>
              </div>
            );
          })}
      <form className="w-100 bottom-0 end-0 px-3" onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <textarea
            id="send"
            type="text"
            className="form-control lead"
            placeholder="write your message"
          />
          <input className="btn btn-warning" type="submit" placeholder="send" />
        </div>
      </form>
    </main>
  );
};

export default ChatBody;
