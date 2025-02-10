import { useCallback, useState } from "react";
import { useMapDimensions } from "./useMapDimensions";

export const useCharacter = (
  propName: string,
  width: number,
  height: number
) => {
  const [name, setName] = useState(propName);
  const [pos, setPos] = useState({ x: 3, y: 5 });
  const moveLeft = () => {
    setPos((pos) => ({
      x: canMove(pos.x - 1, pos.y) ? pos.x - 1 : pos.x,
      y: pos.y,
    }));
  };
  const moveRight = () => {
    setPos((pos) => ({
      x: canMove(pos.x + 1, pos.y) ? pos.x + 1 : pos.x,
      y: pos.y,
    }));
  };
  const moveDown = () => {
    setPos((pos) => ({
      x: pos.x,
      y: canMove(pos.x, pos.y + 1) ? pos.y + 1 : pos.y,
    }));
  };
  const moveUp = () => {
    setPos((pos) => ({
      x: pos.x,
      y: canMove(pos.x, pos.y - 1) ? pos.y - 1 : pos.y,
    }));
  };
  const canMove = useCallback(
    (x: number, y: number) => {
      if (x < 0 || x >= width || y < 0 || y >= height) {
        return false;
      }
      return true;
    },
    [width, height]
  );

  return {
    name,
    x: pos.x,
    y: pos.y,
    moveLeft,
    moveRight,
    moveDown,
    moveUp,
  };
};
