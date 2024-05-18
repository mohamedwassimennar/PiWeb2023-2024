import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.Model';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-show-role',
  templateUrl: './show-role.component.html',
  styleUrls: ['./show-role.component.css']
})
export class ShowRoleComponent implements OnInit {
  usersByRole: { [key: string]: User[] } = {}; // Initialize with an empty object
  customTableNames: { [key: string]: string } = {
    coach: "Coach Table",
    player: "Player Table",
    technicalManager: "Technical Manager Table",
    doctor: "Doctor Table",
    physiotherapist: "Physiotherapist Table",
    assistantCoach: "Assistant Coach Table",
    fitnessCoach: "Fitness Coach Table"  };
  archivedUsers: any[] = [];
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

  isSubMenuOpen: boolean = false;


  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }

  constructor(private userService: UserService,private router :Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsersByRole();
  }

  loadUsersByRole() {
    const roles = ['admin', 'coach', 'player', 'technicalManager', 'doctor', 'physiotherapist', 'assistantCoach', 'fitnessCoach', 'default'];
    roles.forEach(role => {
      this.userService.getAllUsersByRole(role).subscribe(users => {
        this.usersByRole[role] = users;
      });
    });
  }

  archiveUser(user: User) {
    // Archive the user
    this.userService.archiveUser(user._id).subscribe(
      response => {
        console.log('User archived successfully:', response);
        this.loadUsersByRole();
      },
      error => {
        console.error('Error archiving user:', error);
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
