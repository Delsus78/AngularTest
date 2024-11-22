import { Component, computed, input, Input, InputSignal, OnChanges, Signal, SimpleChanges } from '@angular/core';
import {Monster} from '../../../models/monster.model';
import { MonsterTypeProperties } from '../../utils/monster.utils';

@Component({
  selector: 'app-playing-card',
  standalone: true,
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.css'
})
export class PlayingCardComponent {
  monster: InputSignal<Monster> = input(new Monster(), {
    alias: 'monster',
  });

  monsterTypeIcon: Signal<string> = computed(() => MonsterTypeProperties[this.monster().type].image);
  backgroundColor: Signal<string> = computed(() => MonsterTypeProperties[this.monster().type].color);
}
