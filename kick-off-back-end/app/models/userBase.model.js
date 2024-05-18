const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["admin", "coach", "player", "doctor", "technicalManager","physiotherapist","assistantCoach","fitnessCoach","default"],
        required: true
    },
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length >= 8;
            },
            message: props => `Password must be at least 6 characters long!`
        }
    },
    googleId: String,
    profileImage:String ,    
    confirmationCode: {
        type: String,
    },
    confirmedEmail: {
        type: String,
        default: false

    },
    archived: {
        type: Boolean,
        default: false 
      },
      activated: {
        type: Boolean,
        default: false
    },
    twoFactorAuth: {
        type: Boolean,
        default: false,
      },
    foot:String,
    height:String,
    weight:String,
    age: Number,
    systemAccessPermissions: String,
    contact:Number,
    userManagementRights: String,
    dataManagementResponsibilities: String,
    systemConfigurationSettings: String,
    experienceLevel: String,
    assignedTeam: String,
    trainingSchedule: String,
    medicalQualifications: String,
    technicalExpertise: String,
    systemMaintenanceDuties: String,
    integrationResponsibilities: String,
    technicalSupportContact: String,
    position: String,
    teamAffiliation: String,
    performanceMetrics: String,
    medicalHistory: String,
    specializedArea: String, 
    coachingExperience: String, 
    fitnessTrainingExperience: String,
    specializations: String,
    expertiseAreas: String,
    
}); 
          
const User = mongoose.model("User", UserSchema);

module.exports = User;
