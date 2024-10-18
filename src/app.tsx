/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { battle as battleMock } from "./mock";
import BattleEvent, { ACTION_TYPE } from "./entities/BattleEvent";
import Battle from "./entities/Battle";
import User from "./entities/User";
import Monster from "./entities/Monster";
import Spell from "./entities/Spell";
import HealthBar from "./components/HealthBar";
import ManaBar from "./components/ManaBar";

// TODO: explain
function getRandomizer(min: number, max: number) {
  return Math.floor(Math.random() * (1 + max - min)) + min;
}

// POC: Start the battle event
export function App() {
  const [battle, setBattle] = useState<Battle>(battleMock);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user, monster } = battle;

  const eventFormatter = (battleEvent: BattleEvent | string) => {
    // TODO: Improve this function => WTH is this?
    if (typeof battleEvent === "string") {
      return battleEvent;
    }

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

  const baseAtk = useCallback(
    (sender: User | Monster, receiver: User | Monster) => {
      const senderAtk = sender.getAtk();

      const atk = getRandomizer(senderAtk.min, senderAtk.max);
      const isReceiverDead = receiver.getHp() - atk <= 0;

      const battleEvent = new BattleEvent({
        actionType: ACTION_TYPE["base-attack"],
        sender: {
          name: sender.getName(),
        },
        receiver: {
          name: receiver.getName(),
        },
        result: {
          sender: {
            isWinner: isReceiverDead,
          },
          receiver: {
            hp: atk * -1,
          },
        },
      });

      receiver.setHp(receiver.getHp() - atk);

      if (receiver instanceof Monster) {
        setBattle((battle) => {
          return {
            ...battle,
            events: [...battle.events, battleEvent],
            monster: receiver,
          };
        });

        // NB: Avoid that the receiver attack after dead
        if (!isReceiverDead) {
          baseAtk(receiver, sender);
        }
      }

      if (receiver instanceof User) {
        setBattle((battle) => {
          return {
            ...battle,
            events: [...battle.events, battleEvent],
            user: receiver,
          };
        });
      }

      if (isReceiverDead) {
        return;
      }
    },
    [battle]
  );

  const useItem = useCallback((sender: User | Monster, itemName: string) => {
    const item = sender.getItems().find((item) => item.name === itemName);

    if (!item) {
      alert("Item not found!");
      return;
    }

    if (item.quantity <= 0) {
      alert("You don't have enough items");
      return;
    }

    let newHp = sender.getHp() + item.result.hp;
    let newMp = sender.getMp() + item.result.mp;

    if (newHp > sender.getMaxHp()) {
      newHp = sender.getMaxHp();
    }

    if (newMp > sender.getMaxMp()) {
      newMp = sender.getMaxMp();
    }

    sender.setHp(newHp);
    sender.setMp(newMp);
    item.quantity--;

    const battleEvent = new BattleEvent({
      actionType: ACTION_TYPE["item-use"],
      sender: {
        name: sender.getName(),
      },
      receiver: null,
      item: {
        name: item.name,
      },
      result: {
        sender: {
          hp: item.result.hp,
          mp: item.result.mp,
          newQuantity: item.quantity,
        },
        receiver: null,
      },
    });

    if (sender instanceof User) {
      setBattle((battle) => {
        return {
          ...battle,
          events: [...battle.events, battleEvent],
          user: sender,
        };
      });

      baseAtk(battle.monster, sender);
    }
  }, []);

  const spellAtk = useCallback(
    (sender: User | Monster, receiver: User | Monster, spellName: string) => {
      const spell: Spell | undefined = sender
        .getSpells()
        .find((spell) => spell.name === spellName);

      if (!spell) {
        alert("Spell not found!");
        return;
      }

      const senderManaAfterAtk = sender.getMp() - spell.mpCost;
      if (senderManaAfterAtk < 0) {
        alert("You don't have enough mana");
        return;
      }

      const senderAtk = spell.atk;

      const atk = getRandomizer(senderAtk.min, senderAtk.max);
      const isReceiverDead = receiver.getHp() - atk <= 0;

      const battleEvent = new BattleEvent({
        actionType: ACTION_TYPE["spell-attack"],
        sender: {
          name: sender.getName(),
        },
        receiver: {
          name: receiver.getName(),
        },
        spell,
        result: {
          sender: {
            mp: spell.mpCost * -1,
            isWinner: isReceiverDead,
          },
          receiver: {
            hp: atk * -1,
          },
        },
      });

      receiver.setHp(receiver.getHp() - atk);
      sender.setMp(senderManaAfterAtk);

      if (receiver instanceof Monster && sender instanceof User) {
        setBattle((battle) => {
          return {
            ...battle,
            events: [...battle.events, battleEvent],
            monster: receiver,
            user: sender,
          };
        });

        // NB: Avoid that the receiver attack after dead
        if (!isReceiverDead) {
          baseAtk(receiver, sender);
        }
      }

      // NB: later we can implement spell attack for monsters
      if (isReceiverDead) {
        return;
      }
    },
    [battle]
  );

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [battle.events]);

  console.log(JSON.stringify(battle));

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          gap: 200,
          width: "100%",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <textarea
          ref={textareaRef}
          style={{ width: "700px", height: "500px" }}
          value={battle.events.map(eventFormatter).join("\n")}
          readOnly
        />
      </div>
      <div className="flex gap-48 w-full justify-center mt-5">
        <div className="flex flex-col gap-y-4">
          <h1>R20</h1>
          <HealthBar health={user.getHp()} maxHealth={user.character.maxHp} />
          <ManaBar mana={user.getMp()} maxMana={user.character.maxMp} />
        </div>
        <div className="flex flex-col  gap-y-4">
          <h1>{monster.name}</h1>
          <HealthBar
            health={monster.getHp()}
            maxHealth={monster.maxHp}
            monster
          />
          <ManaBar mana={monster.getMp()} maxMana={monster.maxMp} monster />
        </div>
      </div>
      <div className="flex gap-1 w-full justify-center mt-5">
        <button onClick={() => baseAtk(user, monster)}>
          Atacar ({user.character.atk.min} a {user.character.atk.max})
        </button>

        {user.character.spells.map((spell, key) => {
          return (
            <button
              key={key}
              onClick={() => spellAtk(user, monster, spell.name)}
            >
              {spell.name} (MP: {spell.mpCost})
            </button>
          );
        })}

        {user.character.items.map((item, index) => {
          return (
            <button onClick={() => useItem(user, item.name)} key={index}>
              {item.name}: {item.quantity}
            </button>
          );
        })}
      </div>
    </div>
  );
}
