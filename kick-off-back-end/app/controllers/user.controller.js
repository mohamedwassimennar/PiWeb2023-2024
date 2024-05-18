const User = require('../models/userBase.model.js');
const cloudinary = require('cloudinary').v2;

// Function to get all users for a specific role
const getAllUsersByRole = async (req, res) => {
    const { role } = req.params;

    try {
        const users = await User.find({ role });
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const showArchivedUsersByRole = async (req, res) => {
    const { role } = req.params;

    try {
        const users = await User.find({ role, archived: true });
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const image = req.file;

    try {
        let imageUrl = null;

        if (image) {
           
            const result = await cloudinary.uploader.upload(image.path); 
            imageUrl = result.secure_url;
        }

        if (imageUrl) {
            newData.profileImage = imageUrl;
        }

        const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });
        
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
// Function to archive user
const archiveUser = async (req, res) => {
    const { id } = req.params;

    try {
        const archivedUser = await User.findByIdAndUpdate(id, { archived: true }, { new: true });
        res.json({ message: "User archived successfully", user: archivedUser });
    } catch (error) {
        console.error("Error archiving user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to unarchive user
const unarchiveUser = async (req, res) => {
    const { id } = req.params;
    try {
        const unarchivedUser = await User.findByIdAndUpdate(id, { archived: false }, { new: true });
        res.json({ message: "User unarchived successfully", user: unarchivedUser });
    } catch (error) {
        console.error("Error unarchiving user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to count verified users by role
const countVerifiedUsersByRole = async (req, res) => {
    const { role } = req.params;

    try {
        const count = await User.countDocuments({ role, confirmedEmail: true });
        res.status(200).json({ role, verifiedUsersCount: count });
    } catch (error) {
        console.error("Error counting verified users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to count unverified users by role
const countUnverifiedUsersByRole = async (req, res) => {
    const { role } = req.params;

    try {
        const count = await User.countDocuments({ role, confirmedEmail: false });
        res.status(200).json({ role, unverifiedUsersCount: count });
    } catch (error) {
        console.error("Error counting unverified users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
// Function to  deactivateAccount users
const deactivateAccount = async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { activated: false });
    res.status(204).json({
      status: "success",
      data: null,
    });
  };
  
//getProfile
const getProfile = async (req, res) => {
    try {
        const userProfile = await User.findById(req.user.id);

        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }

        res.json(userProfile);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllUsersByRole,
    updateUser,
    deleteUser,
    getProfile,
    archiveUser,
    showArchivedUsersByRole,
    unarchiveUser,
    countVerifiedUsersByRole  ,  
    countUnverifiedUsersByRole,
    deactivateAccount
}
