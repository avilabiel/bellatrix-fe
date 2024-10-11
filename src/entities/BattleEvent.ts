export enum ACTION_TYPE {
  "base-attack",
  "item-use",
  "spell-attack",
  "conclusion",
}

export default class BattleEvent {
  actionType: ACTION_TYPE;
  sender: {
    name: string;
  };
  receiver: {
    name: string;
  };
  item?: null | {
    name: string;
  };
  spell?: null | {
    name: string;
  };
  result: {
    sender: null | {
      hp?: number;
      mp?: number;
      xp?: number;
      isWinner?: boolean;
    };
    receiver: null | {
      hp?: number;
      mp?: number;
      xp?: number;
      isWinner?: boolean;
    };
  };

  constructor(props: BattleEvent) {
    this.actionType = props.actionType;
    this.sender = props.sender;
    this.receiver = props.receiver;
    this.item = props.item;
    this.spell = props.spell;
    this.result = props.result;
  }

  toString() {
    return "haha";
  }
}
