/* eslint-disable @typescript-eslint/no-explicit-any */
import ICombantant from "./ICombatant";
import Spell from "./Spell";

export default class Monster implements ICombantant {
  id?: string;
  name: string;
  image: string;
  level: number;
  hp: number;
  xp: number;
  atk: {
    min: number;
    max: number;
  };
  spawnChance: number;
  createdAt?: Date;

  constructor(props: {
    id?: string;
    name: string;
    image: string;
    level: number;
    hp: number;
    xp: number;
    atk: { min: number; max: number };
    spawnChance: number;
    createdAt?: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.image = props.image;
    this.level = props.level;
    this.hp = props.hp;
    this.xp = props.xp;
    this.atk = props.atk;
    this.spawnChance = props.spawnChance;
    this.createdAt = props.createdAt;
  }

  getAtk(): { min: number; max: number } {
    return this.atk;
  }

  getHp(): number {
    return this.hp;
  }

  setHp(hp: number): void {
    this.hp = hp;
  }

  getMp(): number {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setMp(mp: number): void {
    // NB: monsters don't have spells yet
    throw new Error("Monsters don't have spells yet");
  }

  getImage(): string {
    return this.image;
  }

  getName(): string {
    return this.name;
  }

  getSpells(): Spell[] {
    return [];
  }
}
