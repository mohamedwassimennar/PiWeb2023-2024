
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User.Model';

@Injectable({
  providedIn: 'root'
})
export class PlayerAuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.getUserDetails().pipe(
      map((userDetails: User) => {
        if (!userDetails || userDetails.role !== 'player') {
          this.router.navigate(['access-denied']);
          return false;
        }
        return true;
      })
    );
  }
}
