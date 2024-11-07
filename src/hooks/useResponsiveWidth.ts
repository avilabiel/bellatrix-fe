import { useState, useEffect } from "react";

const useResponsiveWidth = (
  breakpoint: number,
  smallSize: number,
  largeSize: number
) => {
  const [width, setWidth] = useState(
    window.innerWidth < breakpoint ? smallSize : largeSize
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth < breakpoint ? smallSize : largeSize);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint, smallSize, largeSize]);

  return width;
};

export default useResponsiveWidth;
