export default interface ICombantant {
  getName(): string;
  getImage(): string;
  getAtk(): { min: number; max: number };
  getHp(): number;
  setHp(hp: number): void;
}
