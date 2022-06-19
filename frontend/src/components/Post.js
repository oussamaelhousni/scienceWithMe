import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// const toDays = (millsDate) => {
//   return parseInt(millsDate / 1000 / 60 / 60 / 24);
// };

// const dayFormat = (millsDate) => {
//   return toDays(Date.now()) - toDays(millsDate) < 0
//     ? `${toDays(Date.now()) - toDays(millsDate)} days ago`
//     : `${Date(millsDate).toISOString()}`;
// };

const Post = ({ post, user }) => {
  const navigate = useNavigate();
  // when we click into the button we join into the namespace and the room
  // we redirect the user to group chat
  const handleClick = async (e) => {
    console.log("the authenticated user", user);
    const room = e.target.dataset.room;
    try {
      const res = await axios.post(
        `http://localhost:3300/api/${user._id}/addroom`,
        {
          room,
        }
      );
      console.log("room added", res);
      setTimeout(() => {
        navigate("/chat");
      }, 50000);
    } catch (err) {
      console.log("room madded", err);
      setTimeout(() => {
        navigate("/chat");
      }, 50000);
    }
  };

  if (!user) {
    return <div className="display-4">You are not authenticated</div>;
  }

  return (
    <div className="card bg-light mb-3 rounded-0">
      <div className="card-body">
        <div className="d-flex align-items-center gap-3">
          <img
            src={post.user.photo}
            className="rounded-circle"
            alt=""
            style={{ maxWidth: "60px", objectFit: "cover" }}
          />
          <div>
            <h5 className="m-0">
              {post.user.last_name + " " + post.user.first_name}
            </h5>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
          </div>
        </div>

        <div className="card-content">
          <p className="lead fs-5">{post.description}</p>
          <div className="fw-bold mb-2">
            Category :
            <span className="text-dark fs-5 text-primary">{post.category}</span>
          </div>
          <div className="card-footer pt-3 px-0">
            <button
              className="btn btn-primary rounded-0"
              data-room={post.room._id}
              onClick={handleClick}
            >
              Join the discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
