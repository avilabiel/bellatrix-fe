import Battle from "./entities/Battle";
import Monster from "./entities/Monster";
import User from "./entities/User";
import userImage from "./public/images/user.webp";
export const user = new User({
  id: "d76b37ec-0fa6-4c3b-a945-f7f93df81016",
  nick: "r20",
  image: userImage,
  character: {
    level: 1,
    hp: 20,
    mp: 10,
    maxHp: 20,
    maxMp: 10,
    xp: 0,
    atk: {
      min: 3,
      max: 5,
    },
    spells: [
      {
        name: "Bola de fogo",
        atk: {
          min: 7,
          max: 7,
        },
        mpCost: 10,
      },
    ],
    items: [
      {
        name: "Poção de HP",
        result: {
          hp: 10,
          mp: 0,
        },
        quantity: 5,
      },
      {
        name: "Poção de MP",
        result: {
          hp: 0,
          mp: 10,
        },
        quantity: 2,
      },
    ],
  },
  createdAt: new Date(),
});

export const rat = new Monster({
  id: "1234-token",
  name: "Rat",
  image: "https://cdn.vectorstock.com/i/1000v/01/10/rat-vector-2370110.jpg",
  level: 1,
  hp: 20,
  mp: 0,
  maxHp: 20,
  maxMp: 0,
  xp: 10,
  atk: {
    min: 1,
    max: 3,
  },
  spawnChance: 0.5,
  createdAt: new Date(),
});

export const battle = new Battle({
  user: user,
  monster: rat,
  events: [],
  startedAt: new Date(),
});
