import { useState, useEffect } from "react";

const useResponsiveWidth = (
  breakpointWidth: number,
  smallWidth: number,
  largeWidth: number
): number => {
  const [currentWidth, setCurrentWidth] = useState<number>(
    window.innerWidth < breakpointWidth ? smallWidth : largeWidth
  );

  useEffect(() => {
    const handleWindowResize = (): void => {
      setCurrentWidth(
        window.innerWidth < breakpointWidth ? smallWidth : largeWidth
      );
    };

    window.addEventListener("resize", handleWindowResize);
    console.log(window.innerWidth);
    return (): void => window.removeEventListener("resize", handleWindowResize);
  }, [breakpointWidth, smallWidth, largeWidth]);

  return currentWidth;
};

export default useResponsiveWidth;
