import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Injury } from 'src/app/models/injury.model';

@Component({
  selector: 'app-add-injury',
  templateUrl: './add-injury.component.html',
  styleUrls: ['./add-injury.component.css']
})
export class AddInjuryComponent implements OnInit {
  newInjury: Injury = {
    _id: '',
    playerName: '',
    type: 'Muscle', // Assigner une valeur valide à type
    description: '',
    date: new Date(),
    estimatedRecoveryTime: 0,
    archived: false // Ajouter la propriété archived avec une valeur par défaut
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.http.post('http://localhost:3000/injuries/addinjury', this.newInjury)
      .subscribe(
        (response) => {
          console.log('Injury added successfully!', response);
          // Rediriger vers le composant Injuries après l'ajout réussi
          this.router.navigate(['/Injuries']);
          // Réinitialiser le formulaire après l'ajout réussi
          this.resetForm();
        },
        (error) => {
          console.error('Failed to add injury:', error);
        }
      );
  }

  // Réinitialiser le formulaire après l'ajout réussi
  resetForm() {
    this.newInjury = {
      _id: '',
      playerName: '',
      type: 'Muscle', // Réinitialiser le type à une valeur valide
      description: '',
      date: new Date(),
      estimatedRecoveryTime: 0,
      archived: false // Réinitialiser la propriété archived à sa valeur par défaut
    };
  }
}
