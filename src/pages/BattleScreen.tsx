import React from "react";
import { BattleActions } from "@/components/BattleActions";
import BattleMessage from "@/components/BattleMessage";
import BattlePlayers from "@/components/BattlePlayers";
import Button from "@/components/buttons/Button";
import SwordIcon from "@/public/images/sword.png";
import { useCombatActions } from "@/hooks/useCombatActions";
import BattleBackgroundImage from "@/components/BattleBackgroundImage";

// Maybe, battle should go in a context
export default function BattleScreen() {
  const { useItem, spellAtk, baseAtk, battle } = useCombatActions();
  const { user, monster } = battle;

  return (
    <BattleBackgroundImage>
      <BattlePlayers battle={battle} />
      <BattleMessage battle={battle} />
      <BattleActions.AreaContent>
        <Button onClick={() => baseAtk(user, monster)}>
          <BattleActions.AreaIcon>
            <BattleActions.Icon src={SwordIcon} />
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
    </BattleBackgroundImage>
  );
}
