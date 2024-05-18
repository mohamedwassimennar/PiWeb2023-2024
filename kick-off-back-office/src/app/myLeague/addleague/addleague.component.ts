import { Component } from '@angular/core';
import { MyLeague } from '../../models/MyLeague';
import { MyleagueService } from '../../Services/myleague.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';


@Component({
  selector: 'app-addleague',
  templateUrl: './addleague.component.html',
  styleUrls: ['./addleague.component.css']
})
export class AddleagueComponent {
  newAnalysis: MyLeague= new MyLeague();
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; 
  isSubMenuOpen: boolean = false;

  isUserSubMenuOpen: boolean = false;
  toggleUserSubMenu() {
    this.isUserSubMenuOpen = !this.isUserSubMenuOpen;
  }
  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }

  constructor(private router: Router, private matchAnalysisService: MyleagueService,
    private authService: AuthService) { }
  addAnalysis() {
    this.matchAnalysisService.create(this.newAnalysis).subscribe(
      (data) => {
        console.log("New analysis added successfully!");
        this.router.navigate(['/myleague']);

      },
      (error) => {
        console.log("Error adding new analysis:", error);
      }
    );
  }

  
  logout(): void {
    this.authService.performLogout().subscribe(
      () => {
        console.log('Logout successful');
        // Redirect the user to the login page after successful logout
        window.location.href = 'http://localhost:4200/user/login'; // Assuming the other project is running on port 4201
      },
      error => {
        console.error('Logout error:', error);
      }
    );
  }
 
}