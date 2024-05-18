const express = require('express');
const passport = require('passport');
const router = express.Router();
const cors = require('cors'); 
const AuthGoogle = require('../controllers/google');
const authController = require("../controllers/auth.controller");

/* GET users listing. */
//router.get('/connection', authController.loginGoogle);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login", // Redirect to login page on authentication failure
    successRedirect: "/landing-page" // Redirect to landing page on successful authentication
  })
);


module.exports = router;
