import React from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="py-5">
      <div className="form-container">
        <div className="container">
          <div
            className="card card-form mx-auto border-0 shadow"
            style={{ maxWidth: "min(500px,80vw)" }}
          >
            <div className="card-body py-5">
              <div className="card-title text-center mb-4">
                <h1 className="text-primary">Signup</h1>
              </div>
              <form className="form">
                <div className="form-group mb-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-4">
                  <input
                    type="text"
                    placeholder="Second Name"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="text"
                    placeholder="exemple@mail.com"
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-4">
                  <input
                    type="password"
                    placeholder="password"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="submit"
                    className="form-control btn btn-primary"
                  />
                </div>
              </form>
              <div className="text-center d-flex flex-column gap-3 text-decoration-none">
                <Link to="/login" className="text-dark">
                  Login If you already have an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
