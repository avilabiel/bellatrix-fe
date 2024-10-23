import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className="bg-gradient-to-r from-red-600 to-red-400 text-white font-bold py-3 px-6 rounded shadow-lg hover:bg-gradient-to-r hover:from-red-700 hover:to-red-500 transition-all duration-200 transform hover:scale-105"
        ref={ref}
        {...props}
      ></button>
    );
  }
);
export default Button;
