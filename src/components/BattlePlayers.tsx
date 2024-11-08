import React from "react";
import Battle from "@/entities/Battle";
import HealthBar from "./HealthBar";
import ManaBar from "./ManaBar";

type BattlePlayersProps = {
  battle: Battle;
};

export default function BattlePlayers({ battle }: BattlePlayersProps) {
  const { user, monster } = battle;

  return (
    <div className="flex gap-3 lg:gap-12 w-full justify-center mt-5">
      <div className="flex flex-col gap-y-4 items-center">
        <img className="w-28 h-28 sm:w-36 sm:h-36 rounded" src={user.image} />
        <h1>{user.nick}</h1>
        <HealthBar health={user.getHp()} maxHealth={user.character.maxHp} />
        <ManaBar mana={user.getMp()} maxMana={user.character.maxMp} />
      </div>
      <div className="flex py-[15%] sm:py-[10%] lg:py-[5%] xl:py-[3%]">
        <span className="text-xl sm:text-5xl">🆚</span>
      </div>
      <div className="flex flex-col gap-y-4 items-center">
        <img
          className="w-28 h-28 sm:w-36 sm:h-36 rounded"
          src={monster.image}
        />
        <h1>{monster.name}</h1>
        <HealthBar
          health={monster.getHp()}
          maxHealth={monster.maxHp}
          isMonster
        />
        <ManaBar mana={monster.getMp()} maxMana={monster.maxMp} monster />
      </div>
    </div>
  );
}
