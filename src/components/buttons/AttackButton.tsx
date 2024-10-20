import React from "react";
import Button from "./Button";

type AttackButtonProps = {
  onClick: () => void;
  atkMin: number;
  atkMax: number;
};

const AttackButton = ({ onClick, atkMin, atkMax }: AttackButtonProps) => {
  return (
    <Button onClick={onClick}>
      {" "}
      Atacar ({atkMin} a {atkMax})
    </Button>
  );
};

export default AttackButton;
