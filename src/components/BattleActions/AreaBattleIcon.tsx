import React from "react";
type AreaBattleIconProps = {
  children: React.ReactNode;
};
export const AreaBattleIcon = ({ children }: AreaBattleIconProps) => {
  return (
    <div className="bg-gradient-to-t from-[#FEEDB2] to-[#FFF5D9] border-[#B96E4E] max-w-[100px] max-h-[80px] rounded-[3rem] border-solid border-2 py-[0.25rem] pt-[0.35rem] px-[0.75rem] sm:px-4 sm:py-4 text-lg font-bold dark:text-white text-[#B96034] drop-shadow shadow-2xl">
      {children}
    </div>
  );
};