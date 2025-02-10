import React from "react";
import avatar from "../public/images/user.webp";
import Character from "../components/Character";
import { useCharacter } from "@/hooks/useWalk";
import { useMapDimensions } from "@/hooks/useMapDimensions";
import { useCombatActions } from "@/hooks/useCombatActions";
const Map = () => {
  const { width, height } = useMapDimensions();
  const char = useCharacter("x", width, height);

  const moveRight = () => {
    char.moveRight();
  };
  const moveLeft = () => {
    char.moveLeft();
  };
  const moveUp = () => {
    char.moveUp();
  };
  const moveDown = () => {
    char.moveDown();
  };
  const { battle } = useCombatActions();

  return (
    <div className="flex flex-col bg-blue-200 min-h-screen">
      <div className="flex justify-center items-center px-2 pt-2">
        <div
          id="map-image"
          className="bg-[url('./public/images/map.png')] min-h-64 md:min-h-[500px] lg:min-h-[800px] w-full h-full  bg-cover rounded-lg px-4 "
        >
          <Character x={char.x} y={char.y} name={char.name} />
        </div>
      </div>
      <div className="flex flex-col gap-y-4 px-4 items-center pt-4">
        <div className="flex flex-col items-center gap-y-4 ">
          <span
            className="hover:cursor-pointer hover:border-b-blue-500/50 w-0 h-0 border-solid border-t-[0] border-r-[25px] border-b-[50px] border-l-[25px] border-t-transparent border-r-transparent border-b-blue-600 border-l-transparent transform rotate-0"
            onClick={moveUp}
          ></span>
          <div className="flex items-center gap-x-4">
            <span
              className="hover:cursor-pointer hover:border-r-blue-500/50 w-0 h-0 border-t-[25px] border-r-[50px] border-b-[25px] border-l-[0] border-solid border-t-transparent border-r-[#4D72FF] border-b-transparent border-l-transparent rotate-0"
              onClick={moveLeft}
            ></span>
            <span className="w-[60px] h-[60px] bg-[#4D72FF] rounded-[70px]"></span>
            <span
              className="hover:cursor-pointer hover:border-l-blue-500/50 w-0 h-0 border-t-[25px] border-b-[25px] border-r-0 border-l-[50px] border-solid border-transparent border-l-[#4D72FF] rotate-0"
              onClick={moveRight}
            ></span>
          </div>
          <span
            className="hover:cursor-pointer hover:border-t-blue-500/50 w-0 h-0 border-solid border-t-[50px] border-r-[25px] border-b-[0] border-l-[25px] border-t-[#4D72FF] border-r-transparent border-b-transparent border-l-transparent transform rotate-0 "
            onClick={moveDown}
          ></span>
        </div>
        <div className="px-10 flex justify-center">
          <img
            src={avatar}
            alt="arean"
            className="w-full md:w-9/12  2xl:w-2/5 h-full rounded-lg"
          />
        </div>
        <div>
          <span className="italic font-medium">
            {battle.user.nick} - Level {battle.user.character.level}
          </span>
        </div>
        <div>
          <span className="italic ">Hp - {battle.user.getHp()}</span>
        </div>
        <div className="pb-8">
          <span className="italic ">Mp - {battle.user.getMp()}</span>
        </div>
      </div>
    </div>
  );
};

export default Map;
