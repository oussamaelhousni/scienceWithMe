import React from "react";

const Alert = ({ message, type }) => {
  let classAlert = "";
  if (type === "danger") {
    classAlert = "alert alert-danger";
  } else {
    classAlert = "alert alert-success";
  }
  return (
    <div className={classAlert} role="alert">
      {message}
    </div>
  );
};

export default Alert;
