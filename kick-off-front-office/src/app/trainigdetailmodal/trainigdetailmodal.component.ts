import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-trainigdetailmodal',
  templateUrl: './trainigdetailmodal.component.html',
  styleUrls: ['./trainigdetailmodal.component.css']
})
export class TrainigdetailmodalComponent {
  constructor(
    public dialogRef: MatDialogRef<TrainigdetailmodalComponent>, // Assurez-vous que vous avez correctement importé MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  formaterDate(date: Date): string {
    return new Date(date).toLocaleDateString(); // Par exemple, "07/03/2024" pour le format "MM/JJ/AAAA"
  }
  fermerModal(): void {
    this.dialogRef.close();
  }
}
