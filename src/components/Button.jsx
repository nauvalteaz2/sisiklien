import React from 'react';

const Button = ({ style, text, onClick, type = "button" }) => {
  const buttonStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    success: "bg-green-500 text-white hover:bg-green-600",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded ${buttonStyles[style]}`}
    >
      {text}
    </button>
  );
};

export default Button;