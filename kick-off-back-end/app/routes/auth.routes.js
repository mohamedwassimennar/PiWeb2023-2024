const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller");
const path = require('path');
const verifyJWT = require("../middleware/verifyJWT")
const User = require('../models/userBase.model.js');
const multer = require('multer'); // Import multer

router.get('/user/details', verifyJWT, async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
router.post('/registerPlayersFromJson', authController.registerPlayerFromJson); // New route for registering players from JSON file

router.post("/register", upload.single('profileImage'), authController.register); // Handle image upload with Multer

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.get('/confirm/:role', authController.confirmMail);

router.get('/admin',verifyJWT, authController.getAdminDetails);


router.post("/forgotpwd", authController.forgotpwd);

//reset password


module.exports = router;
