import React from "react";
import Button from "./Button";

type ItemButtonProps = {
  onClick: () => void;
  item: {
    name: string;
    quantity: number;
  };
};
const ItemButton = ({ onClick, item }: ItemButtonProps) => {
  return (
    <Button onClick={onClick}>
      {" "}
      {item.name}: {item.quantity} 
    </Button>
  );
};

export default ItemButton;
