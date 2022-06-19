import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Post from "./../Post";
const Posts = ({ user }) => {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    try {
      setIsLoading(true);
      const getPosts = async () => {
        const response = await axios.get("http://localhost:3300/api/posts", {
          crossDomain: true,
        });
        console.log(response.data.data.data);
        setPosts(response.data.data.data);
        setIsLoading(false);
      };
      getPosts();
    } catch (e) {
      setIsLoading(false);
    }
  }, []);
  if (isLoading) {
    return <div className="display-5">Loading posts ....</div>;
  }

  return (
    <main className="posts bg-white px-2">
      <div className="container py-3">
        <div className="row mb-3">
          <div className="col-md-4">
            <button
              className="btn btn-block btn-primary w-100 rounded-0"
              data-bs-toggle="modal"
              data-bs-target="#add_post"
            >
              Add post
            </button>
          </div>
        </div>

        <div className="row">
          {posts.length === 0 ? (
            <h1 className="display-3">No Posts to show</h1>
          ) : (
            posts.map((post) => {
              return <Post key={post._id} post={post} user={user} />;
            })
          )}
        </div>
      </div>
    </main>
  );
};

export default Posts;
