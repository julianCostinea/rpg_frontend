export interface Character {
  id: number;
  name: string;
  hitPoints: number;
  strength: number;
  defense: number;
  intelligence: number;
  class: string;
  weapon: Weapon;
  skills: Skill[];
}

type Weapon = {
  name: string;
  damage: number;
};

type Skill = {
  id: number;
  name: string;
  damage: number;
};
