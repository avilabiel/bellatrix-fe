import { useCallback, useState } from "react";
import User from "@/entities/User";
import Monster from "@/entities/Monster";
import { getRandomizer } from "@/app";
import BattleEvent, { ACTION_TYPE } from "@/entities/BattleEvent";
import Battle from "@/entities/Battle";
import { battle as battleMock } from "@/mock";
import Spell from "@/entities/Spell";

export const useCombatActions = () => {
  const [battle, setBattle] = useState<Battle>(battleMock);
  const { user, monster } = battle;

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
      if (isReceiverDead) {
        alert(`O ${receiver.getName()} morreu!`);
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

  return {
    battle,
    user,
    monster,
    baseAtk,
    useItem,
    spellAtk,
  };
};
