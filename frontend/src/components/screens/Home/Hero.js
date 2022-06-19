import React from "react";
import { Link } from "react-router-dom";
export const Hero = () => {
  return (
    <header className="banner">
      <div className="dark-overlay align-items-center justify-content-center d-flex">
        <div className="inner-banner py-5">
          <div className="container-lg">
            <div className="row">
              <div className="col text-center">
                <h1 className="display-3 text-white text-center">
                  Talk about your favorite <strong>Subjects </strong>with people
                  who are interested in your <strong>Domain.</strong>
                </h1>
                <div>
                  <p className="lead fs-1 text-primary ">
                    What your are waiting for ??{" "}
                    <span className="fw-bolder text-warning">
                      Sign up Today
                    </span>
                  </p>
                  <Link
                    to="/signup"
                    className="btn btn-primary btn-lg rounded-0 px-5"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
