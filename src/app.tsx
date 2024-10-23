/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React from "react";
import { useEffect, useRef } from "react";
import BattleEvent, { ACTION_TYPE } from "./entities/BattleEvent";
import HealthBar from "./components/HealthBar";
import ManaBar from "./components/ManaBar";
import Button from "./components/buttons/Button";

import { useCombatActions } from "./hooks/useCombatActions";
import AttackButton from "./components/buttons/AttackButton";
import ItemButton from "./components/buttons/ItemButton";
import SpellButton from "./components/buttons/SpellButton";


// TODO: explain
export function getRandomizer(min: number, max: number) {
  return Math.floor(Math.random() * (1 + max - min)) + min;
}

// POC: Start the battle event
export function App() {
  const { useItem, spellAtk, baseAtk, battle, monster, user } =
    useCombatActions();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const eventFormatter = (battleEvent: BattleEvent | string) => {
    // TODO: Improve this function => WTH is this?
    if (typeof battleEvent === "string") {
      return battleEvent;
    }
    console.log(battleEvent);
    if (battleEvent.actionType === ACTION_TYPE["base-attack"]) {
      return `${battleEvent.sender.name} atacou o ${
        battleEvent.receiver?.name
      } tirando ${battleEvent.result.receiver?.hp! * -1} pontos de vida`;
    }

    if (battleEvent.actionType === ACTION_TYPE["spell-attack"]) {
      return `${battleEvent.sender.name} atacou o ${
        battleEvent.receiver?.name
      } usando a habilidade ${battleEvent.spell?.name} tirando ${
        battleEvent.result.receiver?.hp! * -1
      } pontos de vida`;
    }

    if (battleEvent.actionType === ACTION_TYPE["item-use"]) {
      return `${battleEvent.sender.name} usou o item ${battleEvent.item?.name} (qnt: ${battleEvent.result.sender?.newQuantity}) aumentando ${battleEvent.result.sender?.hp} pontos de HP e ${battleEvent.result.sender?.mp} pontos de MP`;
    }

    throw new Error("EventFormatter: NOT IMPLEMENTED");
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [battle.events]);

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
      <div className="flex gap-12 w-full justify-center mt-5">
        <textarea
          className="resize-none w-[700px] h-20 px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
          ref={textareaRef}
          value={battle.events.map(eventFormatter).join("\n")}
          readOnly
        />
      </div>
      <div className="flex gap-2 w-full justify-center mt-10">
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

