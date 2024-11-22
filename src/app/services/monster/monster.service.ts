import { inject, Injectable } from '@angular/core';
import { Monster } from '../../../models/monster.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IMonster } from '../../interfaces/monster.interface';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  private BASE_URL = 'http://localhost:8000/monsters';
  private httpClient = inject(HttpClient);

  getAll(): Observable<Monster[]> {
    return this.httpClient.get<IMonster[]>(`${this.BASE_URL}/`).pipe(
      map(monsterDictArray => monsterDictArray.map(monsterDict => Monster.fromJson(monsterDict)))
    )
  }

  get(id: number): Observable<Monster> {
    return this.httpClient.get<IMonster>(`${this.BASE_URL}/${id}/`).pipe(
      map(monsterDict => Monster.fromJson(monsterDict))
    )
  }

  add(monster: Monster): Observable<Monster> {
    return this.httpClient.post<IMonster>(`${this.BASE_URL}/`, monster.toJson()).pipe(
      map(monsterDict => Monster.fromJson(monsterDict))
    )
  }

  update(monster: Monster): Observable<Monster> {
    return this.httpClient.put<IMonster>(`${this.BASE_URL}/${monster.id}/`, monster.toJson()).pipe(
      map(monsterDict => Monster.fromJson(monsterDict))
    )
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}/`);
  }
}