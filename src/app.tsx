/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React from "react";
import HealthBar from "./components/HealthBar";
import ManaBar from "./components/ManaBar";
import SwordIcon from "@/public/images/sword.png";
import { useCombatActions } from "./hooks/useCombatActions";
import BattleMessage from "./components/BattleMessage";
import Button from "./components/buttons/Button";
import { BattleActions } from "./components/BattleActions";
// TODO: explain
// POC: Start the battle event
export function App() {
  const { useItem, spellAtk, baseAtk, battle } = useCombatActions();
  const { user, monster } = battle;

  return (
    <div className="App">
      <div className="flex gap-3 lg:gap-12 w-full justify-center mt-5">
        <div className="flex flex-col gap-y-4 items-center">
          <img className="w-28 h-28 sm:w-36 sm:h-36 rounded" src={user.image} />
          <h1>R20</h1>
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
      <BattleMessage battle={battle} />
      <BattleActions.AreaContent>
        <Button onClick={() => baseAtk(user, monster)}>
          <BattleActions.AreaIcon>
            <BattleActions.Icon url={SwordIcon} />
          </BattleActions.AreaIcon>
        </Button>
        {user.character.items.map((item, index) => (
          <Button
            title={item.name}
            key={index}
            onClick={() => useItem(user, item.name)}
          >
            <BattleActions.AreaIcon>
              <BattleActions.Icon nameOfIcon={item.name} />
            </BattleActions.AreaIcon>
          </Button>
        ))}
        {user.character.spells.map((spell, index) => (
          <Button
            key={index}
            onClick={() => spellAtk(user, monster, spell.name)}
            title={spell.name}
          >
            <BattleActions.AreaIcon>
              <BattleActions.Icon nameOfIcon={spell.name} />
            </BattleActions.AreaIcon>
          </Button>
        ))}
      </BattleActions.AreaContent>
    </div>
  );
}