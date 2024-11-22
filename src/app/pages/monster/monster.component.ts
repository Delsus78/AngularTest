import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  
  private routeSubscription: Subscription | null = null;
  private formValuesSubscription: Subscription | null = null;

  formGroup: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
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
    this.formValuesSubscription = this.formGroup.valueChanges.subscribe(data => {
      this.monster = Object.assign(new Monster(), data);
    });

    this.routeSubscription = this.route.params.subscribe(params => {
      if (params['id']) {
        this.monsterId = parseInt(params['id']);
        const mosterFound = this.monsterService.get(this.monsterId);
        if (mosterFound) {
          this.monster = mosterFound;
          this.formGroup.patchValue(this.monster);
        }
      }
    });
  }

  isFieldValid(field: string): boolean | undefined {
    const control = this.formGroup.get(field);

    return control?.invalid && (control?.dirty || control?.touched);
  }
  
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.formValuesSubscription) {
      this.formValuesSubscription.unsubscribe();
    }
  }

  deleteMonster() {
    const dialogRef = this.deleteDialog.open(DeleteMonsterConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.monsterService.delete(this.monster.id);
        this.navigateBack();
      }
    });
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.monsterId === -1) {
      this.monsterService.add(this.monster);
    } else {
      this.monster.id = this.monsterId;
      this.monsterService.update(this.monster);
    }
    this.navigateBack();
  }
}
