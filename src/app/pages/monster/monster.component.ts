import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, Subscription, switchMap } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { Monster } from '../../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMonsterConfirmationDialogComponent } from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog.component';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule, 
    MatSelectModule,
    ReactiveFormsModule, PlayingCardComponent],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit, OnDestroy {
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  private readonly deleteDialog = inject(MatDialog);
  
  private subscriptions: Subscription = new Subscription();

  formGroup: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELECTRIC, [Validators.required]],
    hp: [1, [Validators.required, Validators.min(1), Validators.max(200)]],
    figureCaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
    attackDescription: ['', [Validators.required]]
  });
  
  monster: Monster = Object.assign(new Monster(), this.formGroup.value);
  monsterId: number = -1;
  monsterTypes = Object.values(MonsterType);

  ngOnInit(): void {
    const formValuesSubscription = this.formGroup.valueChanges.subscribe(data => {
      this.monster = Object.assign(new Monster(), data);
    });
    this.subscriptions.add(formValuesSubscription);

    const routeSubscription = this.route.params.pipe(
      switchMap(params => {
        if (params['monster']) {
          this.monsterId = parseInt(params['monster']);
          return this.monsterService.get(this.monsterId);
        }
        return of(null);
      })
    ).subscribe(monster => {
      if (monster) {
        this.monster = monster;
        this.formGroup.patchValue(monster);
      }
    });
    this.subscriptions.add(routeSubscription);
  }

  isFieldValid(field: string): boolean | undefined {
    const control = this.formGroup.get(field);

    return control?.invalid && (control?.dirty || control?.touched);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  deleteMonster() {
    const dialogRef = this.deleteDialog.open(DeleteMonsterConfirmationDialogComponent);

    const deleteSubscription = dialogRef.afterClosed().pipe(
      filter(confirmation => confirmation),
      switchMap(() => this.monsterService.delete(this.monsterId))
    ).subscribe(_ => this.navigateBack());
    this.subscriptions.add(deleteSubscription);
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  submit(event: Event) {
    event.preventDefault();
    let saveObservable = null;

    if (this.monsterId === -1) {
      saveObservable = this.monsterService.add(this.monster);
    } else {
      this.monster.id = this.monsterId;
      saveObservable = this.monsterService.update(this.monster);
    }
    const saveSubscription = saveObservable.subscribe(() => 
      this.navigateBack()
    );
    this.subscriptions.add(saveSubscription);
  }
}
