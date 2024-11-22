import { Component, computed, inject, model, ModelSignal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MonsterService } from '../../services/monster/monster.service';
import { Monster } from '../../../models/monster.model';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, PlayingCardComponent],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css'
})
export class MonsterListComponent {
  private router: Router = inject(Router);

  monsterService: MonsterService = inject(MonsterService);

  monsters = toSignal(this.monsterService.getAll());
  search: ModelSignal<string> = model<string>('');

  filteredMonsters = computed(() => {
    return this.monsters()?.filter(monster => monster.name.toLowerCase().includes(this.search().toLowerCase())) ?? [];
  });

  addMonster() {
    this.router.navigate(['monster']);
  }

  openMonster(monster: Monster) {
    this.router.navigate(['monster', monster.id]);
  }
}
