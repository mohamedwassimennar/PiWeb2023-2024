export interface Injury {
    _id: string; // Changez cette ligne pour inclure _id
    playerName: string;
    type: 'Muscle' | 'Ligament' | 'Fracture' | 'Other';
    description: string;
    date: Date;
    estimatedRecoveryTime: number;
    archived: boolean;
  }
  