import React from "react";
import { Link } from "react-router-dom";
export const ChatSidebar = ({ rooms, handleRoomClick }) => {
  return (
    <aside className="chat__rooms">
      <div>
        {rooms.length === 0
          ? "No room to show"
          : rooms.map((room) => {
              return (
                <Link
                  key={room._id}
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRoomClick(room);
                  }}
                  className="bg-primary justify-content-center justify-content-lg-start link text-capitalize"
                >
                  <img
                    src="https://via.placeholder.com/60"
                    alt="room icon"
                    className="rounded-circle me-2 fw-bold d-none d-lg-block"
                  />
                  {room.name}
                </Link>
              );
            })}
      </div>
    </aside>
  );
};
