/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React from "react";
import HealthBar from "./components/HealthBar";
import ManaBar from "./components/ManaBar";
import SwordIcon from "@/public/images/sword.png";
import { useCombatActions } from "./hooks/useCombatActions";
import AttackButton from "./components/buttons/AttackButton";
import ItemButton from "./components/buttons/ItemButton";
import SpellButton from "./components/buttons/SpellButton";
import BattleMessage from "./components/BattleMessage;
import ButtonSword from "./components/ButtonSword";

// TODO: explain
// POC: Start the battle event
export function App() {
  const { useItem, spellAtk, baseAtk, battle, monster, user } =
    useCombatActions();
  const { useItem, spellAtk, baseAtk, battle } = useCombatActions();
  const { user, monster } = battle;

  return (
    <div className="App">
      <div className="flex gap-12 w-full justify-center mt-5">
        <div className="flex flex-col gap-y-4 items-center">
          <img className="w-36 h-36 rounded" src={user.image} />
          <h1>R20</h1>
          <HealthBar health={user.getHp()} maxHealth={user.character.maxHp} />
          <ManaBar mana={user.getMp()} maxMana={user.character.maxMp} />
        </div>
        <div className="flex justify-center items-center">
          <span className="text-5xl">🆚</span>
        </div>
        <div className="flex flex-col gap-y-4 items-center">
          <img className="w-36 h-36 rounded" src={monster.image} />
          <h1>{monster.name}</h1>
          <HealthBar
            health={monster.getHp()}
            maxHealth={monster.maxHp}
            monster
          />
          <ManaBar mana={monster.getMp()} maxMana={monster.maxMp} monster />
        </div>
      </div>
      <BattleMessage monster={monster} user={user} battle={battle}/>
      <div className="flex gap-2 w-full justify-center mt-10">
        <ButtonSword onClick={() => baseAtk(user, monster)}>
          <img src={SwordIcon} width={45} className="mt-[-4px]" />
        </ButtonSword>
        <AttackButton
          onClick={() => baseAtk(user, monster)}
          atkMin={user.character.atk.min}
          atkMax={user.character.atk.max}
        />
        {user.character.items.map((item, index) => (
          <ItemButton
            key={index}
            onClick={() => useItem(user, item.name)}
            item={item}
          />
        ))}
        {user.character.spells.map((spell, index) => (
          <SpellButton
            key={index}
            onClick={() => spellAtk(user, monster, spell.name)}
            spell={spell}
          />
        ))}
      </div>
    </div>
  );
}
