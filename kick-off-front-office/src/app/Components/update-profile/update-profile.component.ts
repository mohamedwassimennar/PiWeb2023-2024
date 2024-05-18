import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User.Model';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  currentUser!: User;
  userDetails: any;
  notificationMessage: string = '';
  profileImage: File | null = null; 
  backgroundImageSrc: string = '../../../assets/images/a.jpg'; 

  constructor(private authService: AuthService, private userService: UserService,private router:Router) { }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(userDetails => {
      this.currentUser = userDetails;
    });
  }
  onFileChange(event: any): void {
    this.profileImage = event.target.files[0];
  }

  updateUser(): void {
    if (this.currentUser && this.currentUser._id) {
      const formData: FormData = new FormData();
      
      if (this.profileImage) {
        formData.append('profileImage', this.profileImage as Blob);
      }
  
      formData.append('firstName', this.currentUser.firstName);
      formData.append('lastName', this.currentUser.lastName);
      formData.append('email', this.currentUser.email);
  
      if (this.currentUser.age !== undefined) {
        formData.append('age', this.currentUser.age.toString());
      }
      if (this.currentUser.contact !== undefined) {
        formData.append('contact', this.currentUser.contact.toString());
      }
      
        switch (this.currentUser.role) {
        case 'coach':
          if (this.currentUser.experienceLevel !== undefined) {
            formData.append('experienceLevel', this.currentUser.experienceLevel);
          }
          if (this.currentUser.assignedTeam !== undefined) {
            formData.append('assignedTeam', this.currentUser.assignedTeam);
          }
          if (this.currentUser.trainingSchedule !== undefined) {
            formData.append('trainingSchedule', this.currentUser.trainingSchedule);
          }
          break;
        case 'technicalManager':
          if (this.currentUser.technicalExpertise !== undefined) {
            formData.append('technicalExpertise', this.currentUser.technicalExpertise);
          }
          if (this.currentUser.systemMaintenanceDuties !== undefined) {
            formData.append('systemMaintenanceDuties', this.currentUser.systemMaintenanceDuties);
          }
          if (this.currentUser.integrationResponsibilities !== undefined) {
            formData.append('integrationResponsibilities', this.currentUser.integrationResponsibilities);
          }
          if (this.currentUser.technicalSupportContact !== undefined) {
            formData.append('technicalSupportContact', this.currentUser.technicalSupportContact);
          }
          break;
        case 'player':
          if (this.currentUser.position !== undefined) {
            formData.append('position', this.currentUser.position);
          }
          if (this.currentUser.teamAffiliation !== undefined) {
            formData.append('teamAffiliation', this.currentUser.teamAffiliation);
          }
          if (this.currentUser.performanceMetrics !== undefined) {
            formData.append('performanceMetrics', this.currentUser.performanceMetrics);
          }
          if (this.currentUser.medicalHistory !== undefined) {
            formData.append('medicalHistory', this.currentUser.medicalHistory);
          }
          if (this.currentUser.foot !== undefined) {
            formData.append('foot', this.currentUser.foot.toString());
          }
          
          if (this.currentUser.height !== undefined) {
            formData.append('height', this.currentUser.height.toString());
          }
          
          if (this.currentUser.weight !== undefined) {
            formData.append('weight', this.currentUser.weight.toString());
          }
          

          break;
        case 'doctor':
          if (this.currentUser.medicalQualifications !== undefined) {
            formData.append('medicalQualifications', this.currentUser.medicalQualifications);
          }
          if (this.currentUser.specializations !== undefined) {
            formData.append('specializations', this.currentUser.specializations);
          }
          break;
        case 'physiotherapist':
          if (this.currentUser.medicalQualifications !== undefined) {
            formData.append('medicalQualifications', this.currentUser.medicalQualifications);
          }
          if (this.currentUser.expertiseAreas !== undefined) {
            formData.append('expertiseAreas', this.currentUser.expertiseAreas);
          }
          break;
        case 'assistantCoach':
          if (this.currentUser.coachingExperience !== undefined) {
            formData.append('coachingExperience', this.currentUser.coachingExperience);
          }
          if (this.currentUser.specializedArea !== undefined) {
            formData.append('specializedArea', this.currentUser.specializedArea);
          }
          if (this.currentUser.assignedTeam !== undefined) {
            formData.append('assignedTeam', this.currentUser.assignedTeam);
          }
          break;
        case 'fitnessCoach':
          if (this.currentUser.fitnessTrainingExperience !== undefined) {
            formData.append('fitnessTrainingExperience', this.currentUser.fitnessTrainingExperience);
          }
          if (this.currentUser.specializedArea !== undefined) {
            formData.append('specializedArea', this.currentUser.specializedArea);
          }
          if (this.currentUser.assignedTeam !== undefined) {
            formData.append('assignedTeam', this.currentUser.assignedTeam);
          }
          break;
        default:
          break;
      }
  
      this.userService.updateUser(this.currentUser._id, formData).subscribe(updatedUser => {
        this.router.navigate(['/user/profile']);
      });
    } else {
      console.error('User ID is not defined');
    }
  }
  
  
  cancelUpdate(): void {
    this.router.navigate(['/user/profile']);
  }
}
