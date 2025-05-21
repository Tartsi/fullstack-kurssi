import React from "react";
import PropTypes from "prop-types";

const Message = ({ message, type }) => {
  if (!message) {
    return null;
  }

  const messageStyle = {
    color: type === "success" ? "green" : "red",
    background: "lightgrey",
    fontSize: "20px",
    border: `2px solid ${type === "success" ? "green" : "red"}`,
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={messageStyle}>{message}</div>;
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]),
};

export default Message;
