const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyJWT = require('../middleware/verifyJWT'); // Import the middleware
const multer = require('multer'); // Import multer
const path = require('path');
// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads')); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });

router.get('/users/profile', verifyJWT, userController.getProfile);

router.get("/users/:role", userController.getAllUsersByRole);

router.put("/users/:id", upload.single('profileImage'), userController.updateUser); // Handle image upload with Multer


router.delete("/users/:id", userController.deleteUser);

router.put('/users/:id/archive', userController.archiveUser);

router.put('/users/:id/unarchive', userController.unarchiveUser);

router.get('/users/archived/:role', userController.showArchivedUsersByRole);

router.get("/users/count/unverified/:role", userController.countUnverifiedUsersByRole);

router.get("/users/count/verified/:role", userController.countVerifiedUsersByRole);

module.exports = router;
