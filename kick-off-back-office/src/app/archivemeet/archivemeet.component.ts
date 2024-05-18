import { Component } from '@angular/core';
import { Meet } from '../models/training.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from '../Services/training.service';
import { AuthService } from '../Services/auth/auth.service';


@Component({
  selector: 'app-archivemeet',
  templateUrl: './archivemeet.component.html',
  styleUrls: ['./archivemeet.component.css']
})
export class ArchivemeetComponent {
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

  evenement: Meet[] = [];
  nouveau: Meet = new Meet();
  currentPage: number = 1;
  itemsPerPage: number = 8;
  isSubMenuOpen: boolean = false;
  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }
  isUserSubMenuOpen: boolean = false;
  toggleUserSubMenu() {
    this.isUserSubMenuOpen = !this.isUserSubMenuOpen;
  }
  constructor(private route: ActivatedRoute,
    private router: Router, private trainingService: TrainingService, private authService: AuthService,
  ) { }


  ngOnInit(): void {
    this.getMatches();
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
  getMatches() {
    this.trainingService.getAllMeets()
      .subscribe(
        evenement => {
          this.evenement = evenement;

        },
        error => {
          console.error('Erreur lors du chargement meet :', error);
        }
      );
  }
  navigateToArchive() {
    this.router.navigate(['/meeting']);
  }
  formaterDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}
