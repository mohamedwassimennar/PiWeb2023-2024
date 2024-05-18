import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prevention } from 'src/app/models/prevention.model';

@Component({
  selector: 'app-add-prevention',
  templateUrl: './add-prevention.component.html',
  styleUrls: ['./add-prevention.component.css']
})
export class AddPreventionComponent implements OnInit {
  newPrevention: Prevention = {
    _id: '',
    playerName: '',
    description: '',
    recommendedPractices: 'Not recommended',
    equipmentRecommendations: 'Not recommended',
    nutritionalRecommendations: 'Not recommended',
    lifestyleRecommendations: 'Not recommended',
    archived: false // Ajouter la propriété archived avec une valeur par défaut
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.http.post('http://localhost:3000/prevention/addprevention', this.newPrevention)
      .subscribe(
        (response: any) => {
          console.log('Prevention added successfully!', response);
          // Rediriger vers le composant Preventions après l'ajout réussi
          this.router.navigate(['/Prevention']);
          // Réinitialiser le formulaire après l'ajout réussi
          this.resetForm();
        },
        (error) => {
          console.error('Failed to add prevention:', error);
        }
      );
  }

  // Réinitialiser le formulaire après l'ajout réussi
  resetForm() {
    this.newPrevention = {
      _id: '',
      playerName: '',
      description: '',
      recommendedPractices: 'Not recommended',
      equipmentRecommendations: 'Not recommended',
      nutritionalRecommendations: 'Not recommended',
      lifestyleRecommendations: 'Not recommended',
      archived: false // Réinitialiser la propriété archived à sa valeur par défaut
    };
  }
}
