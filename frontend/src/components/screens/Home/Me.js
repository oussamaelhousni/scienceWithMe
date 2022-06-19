import React from "react";
import oussama from "../../../images/oussama.jpg";
const Me = () => {
  return (
    <div>
      <section className="info-section py-5">
        <div className="container">
          <h1 className="text-center mb-5 text-uppercase title mx-auto border-bottom border-4 pb-3 border-primary">
            Who am I ??
          </h1>
          <div className="row align-items-center">
            <div className="col-md-6 py-5 order-1 order-md-0 text-center text-md-start">
              <h2 className="text-primary">ELhousni Oussama</h2>
              <p className="lead">
                I am 22 years Old student of data science master, who have a big
                interest in web development especially javascript
                technologies(React,Node ..).
                <br />I have made a lot of applications using MERN and i will
                keep it that way. i love building new things using new
                technologies. <br />
                Feel free To check my github{"   "} :&nbsp;
                <a href="" className="fs-4 text-dark">
                  <i class="bi bi-github"></i>
                </a>
              </p>
            </div>
            <div className="col-md-6 d-flex justify-content-center order-0">
              <img
                src={oussama}
                className="img-fluid rounded-circle mx-auto w-75"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Me;
