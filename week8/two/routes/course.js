const express = require('express');
const courseRouter = express.Router();
const { courseModel } = require('../database/db');
const { courseCheck } = require('../middleware/courseCheck');

// Purchased courses route
courseRouter.get('/purchase', courseCheck, async function(req, res) {
    const userid = req.id;

    try {
        const allPurchasedCourses = await courseModel.find({ userid: userid });
        res.status(200).json({ allPurchasedCourses });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Current available courses route
courseRouter.get('/preview', async function(req, res) {
    try {
        const allCourses = await courseModel.find({});  // Removed .toArray()
        res.status(200).json({ allCourses });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = {
    courseRouter
};
