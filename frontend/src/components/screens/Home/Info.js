import React from "react";
import chat from "../../../images/chat.jpg";
const Info = () => {
  return (
    <section className="info-section py-5">
      <div className="container">
        <h1 className="text-center mb-5 text-uppercase title mx-auto border-bottom border-4 pb-3 border-primary">
          About Our Website
        </h1>
        <div className="row">
          <div className="col-md-6">
            <img src={chat} className="img-fluid" />
          </div>

          <div className="col-md-6 align-items-center d-flex flex-column py-5">
            <div className="text-center text-md-start">
              <h2 className="text-primary">
                See and publish scientific subjects
              </h2>
              <p className="lead">
                You can publish topics that you want to talk about.and see other
                people's publication
              </p>
            </div>

            <div className="text-center text-md-start">
              <h2 className="text-primary">Chat with people</h2>
              <p className="lead">
                You can chat with people with the same interest as you,and then
                chatting and growing up your knowledge and never wasting time in
                the same time
              </p>
            </div>

            <div className="text-center text-md-start">
              <h2 className="text-primary">Growing up your knowledge</h2>
              <p className="lead">
                Talking about scientific topics it's a good thing, you can gain
                knowledge improve your communication skills and learn new things
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
