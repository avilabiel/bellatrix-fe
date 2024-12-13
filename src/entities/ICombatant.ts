import Item from "./Item";
import Spell from "./Spell";

export default interface ICombantant {
  getName(): string;
  getImage(): string;
  getAtk(): { min: number; max: number };
  getMaxHp(): number;
  getMaxMp(): number;
  getHp(): number;
  setHp(hp: number): void;
  getMp(): number;
  setMp(mp: number): void;
  getSpells(): Spell[];
  getItems(): Item[];
}
