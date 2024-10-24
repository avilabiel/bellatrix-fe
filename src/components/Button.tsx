import React, { ReactElement } from "react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: Props): ReactElement {
  return (
    <div
      className="bg-gradient-to-t from-[#FEEDB2] to-[#FFF5D9] border-[#4D2A1F] rounded-[3rem] border-solid border-2 px-1 py-1 text-white shadow-2xl hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-gradient-to-t from-[#FEEDB2] to-[#FFF5D9] border-[#B96E4E] max-w-[100px] max-h-[80px] rounded-[3rem] border-solid border-2 px-4 py-4 text-lg font-bold text-gray-900 dark:text-white text-[#B96034] drop-shadow shadow-2xl">
        {children}
      </div>
    </div>
  );
}
