type Spell = {
  name: string;
  atk: {
    min: number;
    max: number;
  };
  mpCost: number;
};

export default Spell;
