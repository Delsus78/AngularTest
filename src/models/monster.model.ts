import { MonsterType } from "../app/utils/monster.utils";

export class Monster {

  id: number = -1;
  name: string = "My Monster";
  imageUrl: string = "assets/img/pik.jpg";
  type: MonsterType = MonsterType.ELECTRIC;

  hp: number = 40;
  figureCaption: string = "N°001 Monster";

  attackName: string = "Attack Name Wow";
  attackStrength: number = 60;
  attackDescription: string = "lorem ipsum dolor sit ame lorem ipsum dolor sit ame lorem ipsum dolor sit ame";

  copy(): Monster {
    return Object.assign(new Monster(), this);
  }
}
