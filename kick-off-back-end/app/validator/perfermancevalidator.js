const yup = require('yup');

const playerPerformance = require("../models/player_performance.model");

const playerPerformanceSchema = yup.object({
    nom: yup.string().required('Le nom est requis.')
        .matches(/^[a-zA-Z ]+$/, { message: 'Le nom doit contenir uniquement des lettres alphabétiques.' })
        .min(3, 'Le nom doit contenir au moins 3 caractères.')
        .trim(),
    //nom: yup.string().required(),
    age: yup.number().integer().min(0),
    totalMatchesPlayed: yup.number().integer().min(0),
    goals: yup.number().integer().min(0),
    totalDistanceCovered: yup.number().integer().min(0),
    yellowCards: yup.number().integer().min(0),
    redCards: yup.number().integer().min(0),
    assists: yup.number().integer().min(0),
    distanceCovered: yup.number().integer().min(0),
});

module.exports = playerPerformanceSchema;
