import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import Alert from "../Alert";
import { Navigate } from "react-router-dom";
// import { authContext } from "../../App";

const Login = ({ setUser, user, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // context
  // const auth = useContext(authContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRedirect(false);
    try {
      const response = await axios.post(
        "http://localhost:3300/api/users/login",
        {
          crossDomain: true,
          email,
          password,
        }
      );
      setUser(response.data.data.user);
      setToken(response.data.token);
      setError(null);
      setSuccess(true);
      setTimeout(() => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        setRedirect(true);
      }, 3000);
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  if (user) {
    return <Navigate to="/chat" />;
  }
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <div className="form-container">
        <div className="container">
          <div
            className="card card-form mx-auto border-0 rounder-0 shadow"
            style={{ maxWidth: "min(500px,80vw)" }}
          >
            <div className="card-body">
              <div className="card-title text-center mb-4">
                <h1 className="text-primary fw-bolder mb-3">Login</h1>
              </div>
              {!error ? "" : <Alert message={error} type="danger" />}
              {!success ? (
                ""
              ) : (
                <Alert
                  message={
                    "You logged in successfully ,you will be redirected soon"
                  }
                  type="success"
                />
              )}

              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <input
                    type="text"
                    placeholder="exemple@mail.com"
                    className="form-control py-2 rounded-0 border-0 border-bottom"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group mb-5">
                  <input
                    type="password"
                    placeholder="*********"
                    className="form-control py-2 rounded-0 border-0 border-bottom"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group mb-5">
                  <input
                    type="submit"
                    className="form-control btn btn-primary rounded-0"
                  />
                </div>
              </form>
              <div className="text-center d-flex flex-column gap-3 text-decoration-none">
                <Link to="/signup">Signup if you don't have an account</Link>
                <Link to="/forgot-password">
                  {" "}
                  <i className="bi bi-lock-fill"></i> I forgot my password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
