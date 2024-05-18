export interface User {
    _id: string; // Optional if using MongoDB's generated _id field
    role: "admin" | "coach" | "player" | "doctor" | "technicalManager" | "physiotherapist" | "assistantCoach" | "fitnessCoach";
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmationCode?: string;
    confirmedEmail?: string;
    archived?:boolean,    
    activated?:boolean,
    profileImage?: string; // New field for the image path

    systemAccessPermissions?: string;
    contact?: number;
    userManagementRights?: string;
    dataManagementResponsibilities?: string;
    systemConfigurationSettings?: string;
    experienceLevel?: string;
    assignedTeam?: string;
    trainingSchedule?: string;
    medicalQualifications?: string;
    technicalExpertise?: string;
    systemMaintenanceDuties?: string;
    integrationResponsibilities?: string;
    technicalSupportContact?: string;
    position?: string;
    age?: number;
    teamAffiliation?: string;
    specializedArea?: string;
    coachingExperience?: string;
    fitnessTrainingExperience?: string;
    specializations?: string;
    expertiseAreas?: string;
    foot?:String,
    height?:String,
    weight?:String,
}
