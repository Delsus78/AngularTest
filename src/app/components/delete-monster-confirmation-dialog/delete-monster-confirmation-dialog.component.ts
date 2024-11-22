import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-monster-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogActions, 
    MatDialogContent, 
    MatDialogTitle, 
    MatDialogClose, 
    MatButtonModule],
  templateUrl: './delete-monster-confirmation-dialog.component.html',
  styleUrl: './delete-monster-confirmation-dialog.component.css'
})
export class DeleteMonsterConfirmationDialogComponent {

}
