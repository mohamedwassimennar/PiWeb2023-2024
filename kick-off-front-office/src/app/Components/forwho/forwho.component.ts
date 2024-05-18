import { Component } from '@angular/core';

@Component({
  selector: 'app-forwho',
  templateUrl: './forwho.component.html',
  styleUrls: ['./forwho.component.css']
})
export class ForwhoComponent {
  toggleInfo(roleId: string): void {
    const role = document.getElementById(roleId);
    if (role) {
      const info = role.querySelector('.role p');
      if (info) {
        info.classList.toggle('hidden');
      }
    }
  }
}
