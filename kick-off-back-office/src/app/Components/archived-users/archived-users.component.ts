import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.Model';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-archived-users',
  templateUrl: './archived-users.component.html',
  styleUrls: ['./archived-users.component.css']
})
export class ArchivedUsersComponent implements OnInit {
  archivedUsersByRole: { [key: string]: User[] } = {};
  customTableNames: { [key: string]: string } = {
    coach: "Coach Table",
    player: "Player Table",
    technicalManager: "Technical Manager Table",
    doctor: "Doctor Table",
    physiotherapist: "Physiotherapist Table",
    assistantCoach: "Assistant Coach Table",
    fitnessCoach: "Fitness Coach Table"  };
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
  constructor(private userService: UserService,private authService: AuthService) { }

  ngOnInit(): void {
    this.loadArchivedUsersByRole();
  }

  loadArchivedUsersByRole() {
    const roles = ['coach', 'player', 'technicalManager', 'doctor','physiotherapist','assistantCoach','fitnessCoach'];
    roles.forEach(role => {
      this.userService.getArchivedUsersByRole(role).subscribe(users => {
        this.archivedUsersByRole[role] = users;
      });
    });
  }
  unarchiveUser(userId: string, role: string): void {
    this.userService.unarchiveUser(userId).subscribe(
      response => {
        console.log('User unarchived successfully:', response);
        this.loadArchivedUsersByRole();

        // Handle success
      },
      error => {
        console.error('Error unarchiving user:', error);
        // Handle error
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
