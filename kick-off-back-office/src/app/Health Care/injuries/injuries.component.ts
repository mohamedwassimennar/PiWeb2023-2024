import { Component, OnInit } from '@angular/core';
import { Injury } from 'src/app/models/injuries';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { InjuriesService } from 'src/app/Services/injuries.service';

@Component({
  selector: 'app-injuries',
  templateUrl: './injuries.component.html',
  styleUrls: ['./injuries.component.css']
})
export class InjuriesComponent implements OnInit {
  injuries: Injury[] = [];
  archivedInjuries: Injury[] = [];
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


  constructor(private injuriesService: InjuriesService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchInjuries();
  }

  fetchInjuries(): void {
    this.injuriesService.getAllInjuries()
      .subscribe(
        injuries => {
          this.injuries = injuries.filter(injury => !injury.archived);
          this.archivedInjuries = injuries.filter(injury => injury.archived);
        },
        error => {
          console.error('Error fetching injuries:', error);
        }
      );
  }


  deleteInjury(injuryId: string): void {
    this.injuriesService.deleteInjury(injuryId)
      .subscribe(
        () => {
          console.log('Injury deleted successfully');
          this.fetchInjuries();
        },
        (error) => {
          console.error('Error deleting injury:', error);
        }
      );
  }

  archiveInjury(injuryId: string): void {
    this.injuriesService.archiveInjury(injuryId)
      .subscribe(
        () => {
          console.log('Injury archived successfully');
          // Retirer la blessure archivée de la liste des blessures actives
          this.injuries = this.injuries.filter(injury => injury._id !== injuryId);
          // Naviguer vers la composante ArchivedInjuriesComponent
          //this.router.navigate(['/ArchivedInjuries']);
        },
        (error) => {
          console.error('Error archiving injury:', error);
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
