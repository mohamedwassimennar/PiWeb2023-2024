
const path = require('path');
const bcrypt = require("bcrypt");
const env = require("dotenv");
const asyncHandler = require("express-async-handler")

const passport = require('passport');
const cloudinary = require('cloudinary').v2; // Import Cloudinary
const fs = require('fs');

const User = require('../models/userBase.model.js');
const { createSecretToken } = require("../middleware/generateToken.js");
const transporter = require('../config/mailer.js');

env.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,

});
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});


const verify = async (req, res) => {
  const { token } = req.params;
  // Check we have a token
  if (!token) {
    return res.status(422).send({
      message: "Missing Token",
    });
  }
  // Step 1 - Verify the token from the URL
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.USER_VERIFICATION_TOKEN_SECRET);
  } catch (err) {
    return res.status(500).send(err);
  }
  try {
    // Step 2 - Find user with matching ID
    const user = await User.findOne({ _id: payload.ID }).exec();
    if (!user) {
      return res.status(404).send({
        message: "User does not exist",
      });
    }
    // Step 3 - Update user verification status to true
    user.verified = true;
    await user.save();
    return res.status(200).send({
      message: "Account Verified",
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

function generateConfirmationCode() {
  const length = 8;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}
const sendConfirmationEmail = (email, confirmationCode, role, password) => {
  const confirmationLink = `http://localhost:3000/api/confirm/${role}?code=${confirmationCode}`;
  const mailOptions = {
    from: 'kickoff_pi@outlook.com',
    to: email,
    subject: 'Confirm Your Email',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
          <h2 style="color: #333333;">Dear User,</h2>
          <p style="color: #333333;">An account has been created for you by the admin. Please click <a href="${confirmationLink}" style="color: #007bff; text-decoration: none;">here</a> to confirm your email and set your password.</p>
          <p style="color: #333333;">Your temporary password: ${password}</p>
          <p style="color: #333333;">If you have any questions or concerns, please contact the admin at <a href="mailto:kickoff_pi@outlook.com" style="color: #007bff; text-decoration: none;">kickoff_pi@outlook.com</a>.</p>
          <p style="color: #333333;">Best Regards,<br>KickOff</p>
        </div>
      </div>
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending confirmation email:', error);
    } else {
      console.log('Confirmation email sent:', info.response);
    }
  });
};

const confirmMail = asyncHandler(async (req, res) => {
  try {
    const confirmationCode = req.query.code;
    const { role } = req.params;

    // Validate if the role is valid
    if (!["admin", "coach", "player", "doctor", "technicalManager", "physiotherapist", "assistantCoach", "fitnessCoach"].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Find the user with the provided confirmation code and role
    const foundUser = await User.findOneAndUpdate(
      { confirmationCode, role },
      { confirmedEmail: true, activated: true } // Update confirmedEmail and activated
    ).exec();

    // If user found and confirmation code is valid, update confirmedEmail and activated
    if (foundUser) {
      await foundUser.save();
      // Serve the HTML file from the 'views' directory
      return res.sendFile(path.join(__dirname, '../views/confirmation.html'));
    } else {
      return res.status(400).json({ message: 'Invalid confirmation code or role' });
    }
  } catch (error) {
    console.error('Error confirming email:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


const registerPlayerFromJson = async (req, res) => {
  try {
    // Read player data from JSON file
    let playerData = JSON.parse(fs.readFileSync('app/data/players.json', 'utf-8'));

    // Log the playerData to inspect its structure
    console.log("Player data from file:", playerData);

    // Array to hold newly registered players
    const registeredPlayers = [];

    // Assuming playerData is an array of player objects
    for (const player of playerData.players) {
      const { firstName, lastName, email, age, contact, position, teamAffiliation, foot, weight, height } = player;

      // Check if player with the same email already exists
      const existingPlayer = await User.findOne({ email });
      if (existingPlayer) {
        console.log(`Player with email ${email} already exists. Skipping registration.`);
        continue;
      }

      const randomPassword = Math.random().toString(36).slice(-8); // Generates an 8-character alphanumeric password

      const confirmationCode = generateConfirmationCode();

      sendConfirmationEmail(email, confirmationCode, 'player', randomPassword);
      player.confirmationCode = confirmationCode;
      // Handle image upload with Multer
      let imageUrl = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      }

      // Hash the password
      const salt = 10;
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      // Create a new player instance
      const newPlayer = new User({
        role: 'player',
        firstName,
        lastName,
        email,
        password: hashedPassword,
        age,
        confirmationCode,
        contact,
        position,
        teamAffiliation,
        foot,
        weight,
        height,
        archived: false,
        activated: false,
        profileImage: imageUrl,

      });

      // Save the player to the database
      await newPlayer.save();
      console.log(`Player with email ${email} registered successfully.`);

      // Add the registered player to the array
      registeredPlayers.push(newPlayer);
    }

    // Update the player data in the JSON file
    playerData.players = [...playerData.players, ...registeredPlayers];
    fs.writeFileSync('app/data/players.json', JSON.stringify(playerData, null, 2), 'utf-8');

    res.status(200).send("Players registered successfully");
  } catch (error) {
    console.log("Error registering players:", error);
    res.status(500).send("Internal Server Error");
  }
};


const register = async (req, res) => {
  try {
    const { role, firstName, lastName, email, archived, activated, age, contact } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User already exists. Please login.");
    }
    if (!(role && firstName && lastName && email && age && contact)) {
      return res.status(400).send("All input is required");
    }

    // Generate a random password
    const randomPassword = Math.random().toString(36).slice(-8);

    const confirmationCode = generateConfirmationCode();

    // Send the confirmation email with the generated password
    sendConfirmationEmail(email, confirmationCode, role, randomPassword);

    let roleSpecificAttributes = {};
    switch (role) {
      case "admin":
        roleSpecificAttributes = {
          systemAccessPermissions: req.body.systemAccessPermissions,
          userManagementRights: req.body.userManagementRights,
          dataManagementResponsibilities: req.body.dataManagementResponsibilities,
          systemConfigurationSettings: req.body.systemConfigurationSettings,
        };
        break;
      case "coach":
        roleSpecificAttributes = {
          experienceLevel: req.body.experienceLevel,
          assignedTeam: req.body.assignedTeam,
          trainingSchedule: req.body.trainingSchedule,
        };
        break;
      case "technicalManager":
        roleSpecificAttributes = {
          technicalExpertise: req.body.technicalExpertise,
          systemMaintenanceDuties: req.body.systemMaintenanceDuties,
          integrationResponsibilities: req.body.integrationResponsibilities,
          technicalSupportContact: req.body.technicalSupportContact,
        };
        break;

      case "doctor":
        roleSpecificAttributes = {
          medicalQualifications: req.body.medicalQualifications,
          specializations: req.body.specializations,
        };
        break;
      case "physiotherapist":
        roleSpecificAttributes = {
          medicalQualifications: req.body.medicalQualifications,
          expertiseAreas: req.body.expertiseAreas,
        };
        break;
      case "assistantCoach":
        roleSpecificAttributes = {
          coachingExperience: req.body.coachingExperience,
          specializedArea: req.body.specializedArea,
        };
        break;
      case "fitnessCoach":
        roleSpecificAttributes = {
          fitnessTrainingExperience: req.body.fitnessTrainingExperience,
          specializedArea: req.body.specializedArea,
        };
        break;
      default:
        return res.status(400).send("Invalid role");
    }
    // Handle image upload with Multer
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    // Hash the password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(randomPassword, salt);

    // Create a new user instance
    const newUser = new User({
      role,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      confirmationCode,
      archived,
      activated,
      contact,
      profileImage: imageUrl,

      ...roleSpecificAttributes,
    });

    // Save the user to the database
    const user = await newUser.save();
    const token = createSecretToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 86400000),
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });

    console.log("Cookie set successfully");

    // Respond with user data
    res.json(user);
  } catch (error) {
    console.log("Got an error", error);
    res.status(500).send("Internal Server Error");
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    // Check if user is activated
    if (!user.activated) {
      return res.status(403).json({ message: "User account is not activated" });
    }

    const token = createSecretToken(user._id);

    if (user.role === 'admin') {
      return res.json({ token, role: user.role, redirect: true });
    } else {
      res.cookie("token", token, {
        path: "/",
        expires: new Date(Date.now() + 86400000),
        secure: true,
        httpOnly: true,
        sameSite: "None",
      });
      return res.json({ token, role: user.role });
    }
  } catch (error) {
    console.log("Got an error", error);
    res.status(500).send("Internal Server Error");
  }
};

const logout = (req, res) => {
  try {
    // Clear the token or session from the client-side
    res.clearCookie("token", {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Got an error", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAdminDetails = asyncHandler(async (req, res) => {
  try {
    const admin = await User.findOne({ role: 'admin' }).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    console.error('Error getting admin details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const forgotpwd = async (req, res) => {
  const { email } = req.body;

  try {
    // Generate a new random password
    const randomPassword = Math.random().toString(36).slice(-8); // Generates an 8-character alphanumeric password

    // Hash the new password
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    // Update the user's password in the database
    const user = await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send the new password via email
    const mailOptions = {
      from: 'kickoff_pi@outlook.com', // Sender's email address
      to: email, // Recipient's email address
      subject: 'Your New Password for KickOff Website', // Email subject
      html: `
        <html>
        <head>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #BCC2EC; padding: 20px;">
          <div style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
            <h2 style="color: #333333; font-size: 24px; font-weight: bold;">Your New Password</h2> <!-- Updated inline styles -->
            <p style="color: #333333;">Your temporary password for KickOff Website is: <span style="font-weight: bold;">${randomPassword}</span></p>
            <p style="color: #333333;">If you have any questions or concerns, please contact the admin at <a href="mailto:kickoff_pi@outlook.com" style="color: #007bff; text-decoration: none;">kickoff_pi@outlook.com</a>.</p>
          
            <p>Best Regards,<br>KickOff</p>
          </div>
        </body>
        </html>
      `
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to send email' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'New password sent successfully' });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, logout, confirmMail, getAdminDetails, verify, forgotpwd, registerPlayerFromJson };
