import { useState, useEffect } from "react";

export const useMapDimensions = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const img = document.getElementById("map-image");
    if (img) {
      setWidth(img.clientWidth);
      setHeight(img.clientHeight);
    }
  }, []);

  return { width, height };
};
