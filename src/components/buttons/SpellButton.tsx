import React from "react";
import Button from "./Button";

type SpellButtonProps = {
  onClick: () => void;
  spell: {
    name: string;
    mpCost: number;
  };
};

const SpellButton = ({ onClick, spell }: SpellButtonProps) => {
  return (
    <Button onClick={onClick}>
      {" "}
      {spell.name} (MP: {spell.mpCost})
    </Button>
  );
};

export default SpellButton;
