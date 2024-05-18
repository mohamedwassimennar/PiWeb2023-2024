export interface User {
    _id?: string; 
    role: "admin" | "coach" | "player" | "doctor" | "technicalManager" | "physiotherapist" | "assistantCoach" | "fitnessCoach";
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmationCode?: string;
    confirmedEmail?: string;
    archived?:boolean,    
    activated?:boolean,
    // Other common fields for all user types
    systemAccessPermissions?: string;
    contact?: number;
    userManagementRights?: string;
    dataManagementResponsibilities?: string;
    systemConfigurationSettings?: string;
    experienceLevel?: string;
    assignedTeam?: string;
    trainingSchedule?: string;
    medicalQualifications?: string;
    playerTreatmentRecords?: string;
    injuryPreventionStrategies?: string;
    rehabilitationPlans?: string;
    technicalExpertise?: string;
    systemMaintenanceDuties?: string;
    integrationResponsibilities?: string;
    technicalSupportContact?: string;
    position?: string;
    age?: number;
    teamAffiliation?: string;
    performanceMetrics?: string;
    medicalHistory?: string;
    specializedArea?: string;
    coachingExperience?: string;
    fitnessTrainingExperience?: string;
    specializations?: string;
    expertiseAreas?: string;
    foot?:String,
    height?:String,
    weight?:String,
}
