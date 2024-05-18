import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-details-modal',
  templateUrl: './event-details-modal.component.html',
  styleUrls: ['./event-details-modal.component.css']
})
export class EventDetailsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EventDetailsModalComponent>, // Assurez-vous que vous avez correctement importé MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  formaterDate(date: Date): string {
    
    return new Date(date).toLocaleDateString(); // Par exemple, "07/03/2024" pour le format "MM/JJ/AAAA"
  }
  fermerModal(): void {
    this.dialogRef.close();
  }

}
