import React, { useEffect } from "react";
import x from "../public/images/map.png";
import Character from "@/components/Character";
import { useCharacter } from "@/hooks/useWalk";
const Map = () => {
  const char = useCharacter("Juan");
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  }, []);
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyA":
      case "ArrowLeft":
        char.moveLeft();
        break;
      case "KeyW":
      case "ArrowUp":
        char.moveUp();
        break;
      case "KeyD":
      case "ArrowRight":
        char.moveRight();
        break;
      case "KeyS":
      case "ArrowDown":
        char.moveDown();
        break;
    }
  };
  return (
    <div id="map-image" className="bg-[url('./public/images/map.png')] absolute top-0 left-0 w-full h-full bg-cover">
      <Character x={char.x} y={char.y} name={char.name} />
    </div>
  );
};

export default Map;
