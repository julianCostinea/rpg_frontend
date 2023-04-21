export interface Character {
  id: number;
  name: string;
  hitPoints: number;
  strength: number;
  defense: number;
  intelligence: number;
  class: string;
  weapon: Weapon;
}

type Weapon = {
  name: string;
  damage: number;
};
