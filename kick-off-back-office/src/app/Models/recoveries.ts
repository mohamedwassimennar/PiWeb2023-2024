export interface RecoveryPlan {
    _id: string; // Identifiant unique du plan de récupération
    playerName: string; // Nom du joueur
    injuryStatus: string; // Statut de la blessure
    recoveryStartDate: Date; // Date de début de la récupération
    recoveryEndDate: Date; // Date de fin de la récupération
    recoveryActivities: string; // Activités de récupération
    archived: boolean;
  }