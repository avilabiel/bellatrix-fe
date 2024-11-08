import React from "react";
import PotionHp from "@/public/images/PotionHp.png";
import PotionMp from "@/public/images/PotionMp.png";
import Fireball from "@/public/images/Fireball.png";
type BattleIconProps = {
  url?: string;
  nameOfIcon?: string;
};
export const BattleIcon = ({ url, nameOfIcon }: BattleIconProps) => {
  if (!url) {
    switch (nameOfIcon) {
      case "Poção de HP":
        url = PotionHp;
        break;
      case "Poção de MP":
        url = PotionMp;
        break;
      case "Bola de fogo":
        url = Fireball;
        break;
    }
  }

  return <img src={url} className="mt-[-4px] w-[40px] h-[57px] object-contain" />;
};
