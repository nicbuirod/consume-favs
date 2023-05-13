import React from "react";

const Button = ({ nameButton, handleCLick, type }) => {
  return (
    <div>
      <button onClick={handleCLick} type={type}>
        {nameButton}
      </button>
    </div>
  );
};

export default Button;
