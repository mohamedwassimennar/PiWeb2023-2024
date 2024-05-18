import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stagedetailmodal',
  templateUrl: './stagedetailmodal.component.html',
  styleUrls: ['./stagedetailmodal.component.css']
})
export class StagedetailmodalComponent {
  constructor(
    public dialogRef: MatDialogRef<StagedetailmodalComponent>, // Assurez-vous que vous avez correctement importé MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  formaterDate(date: Date): string {
    return new Date(date).toLocaleDateString(); // Par exemple, "07/03/2024" pour le format "MM/JJ/AAAA"
  }
  fermerModal(): void {
    this.dialogRef.close();
  }
}
