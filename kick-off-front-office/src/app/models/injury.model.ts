export interface Injury {
  _id: string;
  playerName: string;
  type: 'Muscle' | 'Ligament' | 'Fracture' | 'Other';
  description: string;
  date: Date;
  estimatedRecoveryTime: number;
  archived: boolean; 
}
