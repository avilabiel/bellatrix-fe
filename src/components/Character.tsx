import React from "react";
type Props = {
  x: number;
  y: number;
  name: string;
};
const Character = ({ x, y }: Props) => {
  return (
    <div
      className="w-9 sm:w-12 h-9 sm:h-12 2xl:w-16 2xl:h-16"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        position: "absolute",
        border: "2px solid #fff",
        borderRadius: "50%",
        background: "#0284c7",
      }}
    >
      <div className="text-white w-[80%] h-[80%] rounded-full text-center absolute top-[25%] left-[10%]"></div>
    </div>
  );
};

export default Character;
