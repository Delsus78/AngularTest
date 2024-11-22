import { Injectable } from '@angular/core';
import { Monster } from '../../../models/monster.model';
import { MonsterType } from '../../utils/monster.utils';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  monsters: Monster[] = [];
  currentIndex: number = 1;

  constructor() {
    this.load();
  }

  private save() {
    localStorage.setItem('monsters', JSON.stringify(this.monsters));
  }

  private load() {
    const monstersData = localStorage.getItem('monsters');
    if (monstersData) {
      this.monsters = JSON.parse(monstersData).map((monsterJSON: any) => Object.assign(new Monster(), monsterJSON));
      this.currentIndex = Math.max(...this.monsters.map(monster => monster.id));
    } else {
      this.init();
      this.save();
    }
  }

  private init() {
    this.monsters = [];

    const monster1 = new Monster();
    monster1.id = this.currentIndex++;
    monster1.name = "Pik";
    monster1.imageUrl = "assets/img/pik.jpg";
    monster1.type = MonsterType.ELECTRIC;
    monster1.hp = 40;
    monster1.figureCaption = "N°001 Monster";
    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.id = this.currentIndex++;
    monster2.name = "Bul";
    monster2.imageUrl = "assets/img/bul.jpg";
    monster2.type = MonsterType.PLANT;
    monster2.hp = 50;
    monster2.figureCaption = "N°002 Monster";
    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.id = this.currentIndex++;
    monster3.name = "Dra";
    monster3.imageUrl = "assets/img/drac.jpg";
    monster3.type = MonsterType.FIRE;
    monster3.hp = 60;
    monster3.figureCaption = "N°003 Monster";
    this.monsters.push(monster3);

    const monster4 = new Monster();
    monster4.id = this.currentIndex++;
    monster4.name = "Car";
    monster4.imageUrl = "assets/img/car.jpg";
    monster4.type = MonsterType.WATER;
    monster4.hp = 70;
    monster4.figureCaption = "N°004 Monster";
    this.monsters.push(monster4);
  }

  getAll(): Monster[] {
    return this.monsters.map(monster => monster.copy());
  }

  get(id: number): Monster | undefined {
    const monster = this.monsters.find(monster => monster.id === id);
    return monster ? monster.copy() : undefined;
  }

  add(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    monsterCopy.id = this.currentIndex++;
    this.monsters.push(monsterCopy);
    this.save();

    return monsterCopy;
  }

  update(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    const monsterIndex = this.monsters.findIndex(monster => monster.id === monsterCopy.id);
    if (monsterIndex != -1) {
      this.monsters[monsterIndex] = monsterCopy;
    }
    this.save();

    return monsterCopy;
  }

  delete(id: number): void {
    const monsterIndex = this.monsters.findIndex(monster => monster.id === id);
    if (monsterIndex != -1) {
      this.monsters.splice(monsterIndex, 1);
    }
    this.save();
  }
}