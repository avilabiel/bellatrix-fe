import BattleEvent, { ACTION_TYPE } from "@/entities/BattleEvent";

export const eventFormatter = (battleEvent: BattleEvent | string): string => {
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
