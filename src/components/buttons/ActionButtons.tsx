import React from "react";
import AttackButton from "./AttackButton";
import SpellButton from "./SpellButton";
import ItemButton from "./ItemButton";
import User from "@/entities/User";
import Monster from "@/entities/Monster";
import { useCombatActions } from "@/hooks/useCombatActions";
import Button from "./Button";
import Button from "../Button";
import SwordIcon from "@/public/images/sword.png";

type ActionButtonsProps = {
  user: User;
  monster: Monster;
  spellAtk?: (user: User, monster: Monster, spell: string) => void;
  useItem?: (user: User, item: string) => void;
};

const ActionButtons = ({
  user,
  monster,
  spellAtk,
  useItem,
}: ActionButtonsProps) => {
  const { baseAtk, battle } = useCombatActions();
  console.log("ActionButtons", user, monster);
  return (
    <div className="flex gap-2 w-full justify-center mt-10">
      {/* <AttackButton
      <Button onClick={() => baseAtk(user, monster)}>
        <img src={SwordIcon} width={45} className="mt-[-4px]" />
      </Button>
      <AttackButton
        onClick={() => baseAtk(user, monster)}
        atkMin={user.character.atk.min}
        atkMax={user.character.atk.max}
      /> */}
      <Button onClick={() => baseAtk(user, monster)}>ATACAR ACT TESTE</Button>
      {/* {user.character.spells.map((spell, index) => (
        <SpellButton
          key={index}
          onClick={() => spellAtk(user, monster, spell.name)}
          spell={spell}
        />
      ))}
      {user.character.items.map((item, index) => (
        <ItemButton
          key={index}
          onClick={() => useItem(user, item.name)}
          item={item}
        />
      ))} */}
    </div>
  );
};

export default ActionButtons;
