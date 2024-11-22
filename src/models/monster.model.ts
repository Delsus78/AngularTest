import { IMonster } from "../app/interfaces/monster.interface";
import { MonsterType } from "../app/utils/monster.utils";

export class Monster implements IMonster{

  id: number = -1;
  name: string = "My Monster";
  image: string = "assets/img/pik.jpg";
  type: MonsterType = MonsterType.ELECTRIC;

  hp: number = 40;
  figureCaption: string = "N°001 Monster";

  attackName: string = "Attack Name Wow";
  attackStrength: number = 60;
  attackDescription: string = "lorem ipsum dolor sit ame lorem ipsum dolor sit ame lorem ipsum dolor sit ame";

  copy(): Monster {
    return Object.assign(new Monster(), this);
  }

  static fromJson(monsterJson: IMonster): Monster {
    return Object.assign(new Monster(), monsterJson);
  }

  toJson(): IMonster {
    const monsterJson: IMonster = Object.assign({}, this);
    delete monsterJson.id;

    return monsterJson;
  }
}
