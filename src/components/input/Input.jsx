import React from "react";

const Input = ({ placeholder, type, name }) => {
  return (
    <div>
      <input
        type={type}
        className="input"
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

export default Input;
