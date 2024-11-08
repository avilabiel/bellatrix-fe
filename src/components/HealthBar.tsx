import React from "react";
import Bar from "../EmptyBar.png";
import useResponsiveWidth from "@/hooks/useResponsiveWidth";
import { formatSizeBar } from "@/utils/formatedSizeBar";

type HealthBarProps = {
  health: number;
  maxHealth: number;
  isMonster?: boolean;
};

const HealthBar = ({ health, maxHealth, isMonster }: HealthBarProps) => {
  const width = useResponsiveWidth(768, 105, 234);
  const healthBarWidth = formatSizeBar(health, maxHealth, width);

  return (
    <div className={`flex gap-x-2 ${isMonster ? "flex-row-reverse" : ""}`}>
      <div
        className="relative w-[130px] sm:w-[320px] h-[120px] max-w-[320px] bg-contain bg-no-repeat flex justify-center items-center"
        style={{ backgroundImage: `url(${Bar})` }}
      >
        <div
          className="absolute bottom-[66px] sm:bottom-0 inset-0 flex items-center justify-start px-[9.3%] sm:px-[9.8%]"
        >
          <div
            className="h-[30%] bg-red-500 rounded-md sm:rounded-lg transition-all duration-300 ease-in-out"
            style={{ width: `${healthBarWidth}px` }}
          />
        </div>
      </div>
    </div>
  );
};

export default HealthBar;
