import React from "react";

interface ButtonProps {
  isLoading?: boolean;
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  text,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  const buttonClasses = `flex w-full justify-center cursor-pointer rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset disabled:bg-gray-400 ${className}`;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={buttonClasses}
    >
      {isLoading ? "Loading..." : text}
    </button>
  );
};

export default Button;
