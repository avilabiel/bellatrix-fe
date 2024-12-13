import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className="bg-gradient-to-t from-[#FEEDB2] to-[#FFF5D9] border-[#4D2A1F] rounded-[3rem] border-solid border-2 px-1 py-1 text-white shadow-2xl hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
        ref={ref}
        {...props}
      />
    );
  }
);
export default Button;
