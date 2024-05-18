const Staff = require('../models/staff.model');

exports.create = async(req, res) => {
    try {
        const staff = await Staff.create(req.body);
        res.status(201).json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findAll = async(req, res) => {
    try {
        const staffList = await Staff.find();
        res.json(staffList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findOne = async(req, res) => {
    try {
        const staff = await Staff.findById(req.params.staffId);
        if (!staff) {
            return res.status(404).json({ message: 'Membre du personnel introuvable' });
        }
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async(req, res) => {
    try {
        const updatedStaff = await Staff.findByIdAndUpdate(req.params.staffId, req.body, { new: true });
        if (!updatedStaff) {
            return res.status(404).json({ message: 'Membre du personnel introuvable' });
        }
        res.json(updatedStaff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async(req, res) => {
    try {
        const deletedStaff = await Staff.findByIdAndDelete(req.params.staffId);
        if (!deletedStaff) {
            return res.status(404).json({ message: 'Membre du personnel introuvable' });
        }
        res.json({ message: 'Membre du personnel supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};