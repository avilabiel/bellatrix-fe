import React from "react";
import AttackButton from "./AttackButton";
import SpellButton from "./SpellButton";
import ItemButton from "./ItemButton";
import User from "@/entities/User";
import Monster from "@/entities/Monster";

type ActionButtonsProps = {
  user: User;
  monster: Monster;
  baseAtk: (user: User, monster: Monster) => void;
  spellAtk: (user: User, monster: Monster, spell: string) => void;
  useItem: (user: User, item: string) => void;
};

const ActionButtons = ({
  user,
  monster,
  baseAtk,
  spellAtk,
  useItem,
}: ActionButtonsProps) => {
  return (
    <div className="flex gap-2 w-full justify-center mt-10">
      <AttackButton
        onClick={() => baseAtk(user, monster)}
        atkMin={user.character.atk.min}
        atkMax={user.character.atk.max}
      />
      {user.character.spells.map((spell, index) => (
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
      ))}
    </div>
  );
};

export default ActionButtons;
