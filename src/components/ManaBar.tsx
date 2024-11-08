import React from "react";
import Bar from "../EmptyBar.png";
import useResponsiveWidth from "@/hooks/useResponsiveWidth";
import { formatSizeBar } from "@/utils/formatedSizeBar";
type ManaProps = {
  mana: number;
  maxMana: number;
  monster?: boolean;
};
const ManaBar = ({ mana, maxMana, monster }: ManaProps) => {
  const responsiveWidth = useResponsiveWidth(768, 105, 234);
  const manaBarWidth = formatSizeBar(mana, maxMana, responsiveWidth);

  return (
    <div
      className={`flex gap-x-2 ${
        monster ? "flex-row-reverse" : ""
      } mt-[-5.5rem] sm:mt-[-1.5rem]`}
    >
      <div
        className="relative w-[130px] sm:w-[320px] h-[120px] max-w-[320px] bg-contain bg-no-repeat flex justify-center items-center"
        style={{ backgroundImage: `url(${Bar})` }}
      >
        <div className="absolute bottom-[66px] sm:bottom-0 inset-0 flex items-center justify-start px-[9.3%] sm:px-[9.8%]">
          <div
            className="h-[30%] bg-teal-400 rounded-md sm:rounded-lg transition-all duration-300 ease-in-out"
            style={{ width: `${manaBarWidth}px` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ManaBar;
