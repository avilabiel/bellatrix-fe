import React from "react";
import PotionHp from "@/public/images/PotionHp.png";
import PotionMp from "@/public/images/PotionMp.png";
import Fireball from "@/public/images/Fireball.png";
type BattleIconProps = {
  src?: string;
  nameOfIcon?: string;
};
export const BattleIcon = ({ src, nameOfIcon }: BattleIconProps) => {
  if (!src) {
    switch (nameOfIcon) {
      case "Poção de HP":
        src = PotionHp;
        break;
      case "Poção de MP":
        src = PotionMp;
        break;
      case "Bola de fogo":
        src = Fireball;
        break;
    }
  }

  return (
    <img src={src} className="mt-[-4px] w-[40px] h-[57px] object-contain" />
  );
};
