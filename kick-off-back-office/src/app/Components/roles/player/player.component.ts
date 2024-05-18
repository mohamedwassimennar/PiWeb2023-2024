import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { UserService } from 'src/app/Services/user/user.service';
import { User } from 'src/app/models/User.Model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent  implements OnInit{
  users: User[] = [];
  showDetails: boolean[] = [];
  isSubMenuOpen: boolean = false;
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image
  usersByRole: { [key: string]: User[] } = {}; // Initialize with an empty object

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
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadplayerUsers();
  }



  loadplayerUsers() {
    this.userService.getAllUsersByRole('player').subscribe(users => {
      this.users = users;
    });
  }

  toggleDetails(index: number) {
    this.showDetails[index] = !this.showDetails[index];
  }

  archiveUser(user: User) {
    // Archive the user
    this.userService.archiveUser(user._id).subscribe(
      response => {
        console.log('User archived successfully:', response);
        this.loadplayerUsers();
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

