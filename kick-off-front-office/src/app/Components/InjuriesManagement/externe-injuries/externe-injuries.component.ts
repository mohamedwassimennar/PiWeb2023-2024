import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-externe-injuries',
  templateUrl: './externe-injuries.component.html',
  styleUrls: ['./externe-injuries.component.css']
})
export class ExterneInjuriesComponent implements OnInit {
  externeInjuries: any = {};
  filteredInjuries: any = {};
  Object = Object; // Pour rendre Object accessible dans le template
  currentPage: number = 1; 
  itemsPerPage: number = 3; 

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getInjuries();
  }

  getInjuries(): void {
    this.http.get<any>('http://localhost:3000/apiExterneInjuries')
      .subscribe(data => {
        this.externeInjuries = data;
        this.filteredInjuries = data; // Initialiser les données filtrées avec toutes les données
      });
  }

  applyFilter(event: any): void {
    const searchTerm = event.target.value.trim().toLowerCase();
    if (!searchTerm) {
      this.filteredInjuries = this.externeInjuries; // Si aucun terme de recherche, afficher tout
      return;
    }
    
    this.filteredInjuries = {};
    
    for (let team of Object.keys(this.externeInjuries)) {
      // Filtrer les blessures qui correspondent au terme de recherche
      let matchingInjuries = this.externeInjuries[team].injuries.filter((injury: any) =>
        injury.player.toLowerCase().includes(searchTerm) ||
        injury.reason.toLowerCase().includes(searchTerm) ||
        injury.further_detail.toLowerCase().includes(searchTerm)
      );

      if (matchingInjuries.length > 0) {
        this.filteredInjuries[team] = { injuries: matchingInjuries }; // Conserver uniquement les équipes avec des correspondances
      }
    }
  }
}
