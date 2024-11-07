import React, { useState, useEffect } from "react";
import heart from "../heart.png";
import Bar from "../EmptyBar.png";
import useResponsiveWidth from "@/hooks/useResponsiveWidth";
import { formatSizeBar } from "@/utils/formatedSizeBar";

type HealthBarProps = {
  health: number;
  maxHealth: number;
  monster?: boolean;
};

const HealthBar = ({ health, maxHealth, monster }: HealthBarProps) => {
  const width = useResponsiveWidth(768, 105, 234);
  const formatedSize = formatSizeBar(health, maxHealth, width);

  return (
    <div className={`flex gap-x-2 ${monster ? "flex-row-reverse" : ""}`}>
      <div
        className="relative w-[130px] sm:w-[320px] h-[120px] max-w-[320px] bg-contain bg-no-repeat flex justify-center items-center"
        style={{
          backgroundImage: `url(${Bar})`,
        }}
      >
        <div className="absolute bottom-[66px] sm:bottom-0 inset-0 flex items-center justify-start px-[9.3%] sm:px-[9.8%]">
          <div
            className="h-[30%] bg-red-500 rounded-md sm:rounded-lg transition-all duration-300 ease-in-out"
            style={{
              width: `${formatedSize}px`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HealthBar;
