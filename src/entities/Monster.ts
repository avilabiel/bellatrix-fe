/* eslint-disable @typescript-eslint/no-explicit-any */
import ICombantant from "./ICombatant";
import Item from "./Item";
import Spell from "./Spell";

export default class Monster implements ICombantant {
  id?: string;
  name: string;
  image: string;
  level: number;
  hp: number;
  mp: number;
  maxHp: number;
  maxMp: number;
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
    mp: number;
    maxHp: number;
    maxMp: number;
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
    this.mp = props.mp;
    this.maxHp = props.maxHp;
    this.maxMp = props.maxMp;
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

  getMaxHp(): number {
    return this.maxHp;
  }

  setHp(hp: number): void {
    this.hp = hp;
  }

  getMp(): number {
    return this.mp;
  }

  getMaxMp(): number {
    return this.maxMp;
  }

  setMp(mp: number): void {
    this.mp = mp;
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

  getItems(): Item[] {
    return [];
  }
}
