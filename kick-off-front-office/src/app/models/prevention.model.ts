export interface Prevention {
  _id: string;
  playerName: string;
  description: string;
  recommendedPractices: 'Not recommended' | 'Proper warm-up and cool-down routines' | 'Regular sports massage therapy' | 'Periodic medical check-ups and assessments' | 'Implement injury prevention programs';
  equipmentRecommendations: 'Not recommended' | 'Wear appropriate cleats for the playing surface' | 'Use shin guards for protection';
  nutritionalRecommendations: 'Not recommended' | 'Maintain a balanced diet rich in carbohydrates, protein, and healthy fats' | 'Stay hydrated by drinking water before, during, and after activities';
  lifestyleRecommendations: 'Not recommended' | 'Manage training workload to avoid overtraining and fatigue' | 'Incorporate rest days into training schedules' | 'Practice safe tackling and falling techniques to prevent injuries' | 'Educate athletes about common injuries and early warning signs';
  archived: boolean; 
}
