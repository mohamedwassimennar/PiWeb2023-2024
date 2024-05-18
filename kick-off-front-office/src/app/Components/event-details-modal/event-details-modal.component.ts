import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-details-modal',
  templateUrl: './event-details-modal.component.html',
  styleUrls: ['./event-details-modal.component.css']
})
export class EventDetailsModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data); // Log the received data to check if it's correct
  }

}
