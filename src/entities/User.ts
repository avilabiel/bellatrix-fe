/* eslint-disable @typescript-eslint/no-explicit-any */
import ICombantant from "./ICombatant";
import Spell from "./Spell";

type Item = {
  name: string;
  result: {
    hp: number;
    mp: number;
  };
  quantity: number;
};

type Character = {
  level: number;
  hp: number;
  mp: number;
  xp: number;
  atk: {
    min: number;
    max: number;
  };
  spells: Spell[];
  items: Item[];
};

export default class User implements ICombantant {
  id?: string;
  nick: string;
  image: string;
  character: Character;
  createdAt?: Date;

  constructor(props: {
    id?: string;
    nick: string;
    image: string;
    character: Character;
    createdAt?: Date;
  }) {
    this.id = props.id;
    this.nick = props.nick;
    this.image = props.image;
    this.character = props.character;
    this.createdAt = props.createdAt;
  }

  getAtk(): { min: number; max: number } {
    return this.character.atk;
  }

  getHp(): number {
    return this.character.hp;
  }

  setHp(hp: number): void {
    this.character.hp = hp;
  }

  getMp(): number {
    return this.character.mp;
  }

  setMp(mp: number): void {
    this.character.mp = mp;
  }

  getImage(): string {
    return this.image;
  }

  getName(): string {
    return this.nick;
  }

  getSpells(): Spell[] {
    return this.character.spells;
  }
}
