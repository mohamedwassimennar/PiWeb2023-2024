import { Component } from '@angular/core';
import { MyLeague } from '../../models/MyLeague';
import { MyleagueService } from '../../Services/myleague.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-modifyleague',
  templateUrl: './modifyleague.component.html',
  styleUrls: ['./modifyleague.component.css']
})
export class ModifyleagueComponent {
  analysisId!: string;
  analysisDetails: MyLeague = new MyLeague();
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private analysisService: MyleagueService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.analysisId = this.route.snapshot.params['id']; 

    this.analysisService.getById(this.analysisId).subscribe(
      (data) => {
        this.analysisDetails = data;
      },
      (error) => {
        console.log("Error fetching analysis details:", error);
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
  updateAnalysis() {
    this.analysisService.update(this.analysisId, this.analysisDetails).subscribe(
      (data) => {
        console.log("Analysis updated successfully!");
       
        this.router.navigate(['/myleague']);

      },
      (error) => {
        console.log("Error updating analysis:", error);
      }
    );
  }
  
}

