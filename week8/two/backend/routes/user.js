const { userModel, purchaseModel, courseModel } = require('../database/db');
const express = require('express');
const userRouter = express.Router();
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userCheck } = require('../../frontend/middleware/userCheck');
require('dotenv').config();

userRouter.post('/signup', async function (req, res) {
    const requiredBody = z.object({
        username: z.string().min(3).max(30),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const parseBody = requiredBody.safeParse(req.body);
    if (!parseBody.success) {
        return res.status(403).json({
            msg: "Incorrect credentials",
            error: parseBody.error,
        });
    }

    const { username, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const existUser = await userModel.findOne({ email: email });

    if (existUser) {
        return res.status(409).json({ msg: "User already exists" });
    }

    const newUser = { username, email, password: hashedPass };
    try {
        await userModel.create(newUser);
        res.status(200).json({ msg: "Registration successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(403).json({ msg: "Please provide email and password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ msg: "User does not exist, please sign up" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(403).json({ msg: "Incorrect password" });
    }

    try {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ msg: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.post('/purchase', userCheck, async function (req, res) {
    const { courseId } = req.body;
    if (!courseId) {
        return res.status(400).json({ msg: "Course ID is required for purchases." });
    }

    const userId = req.id;
    const newPurchase = { courseId, userId };

    try {
        const coursePurchase = await purchaseModel.create(newPurchase);
        res.status(200).json({
            msg: "Purchase successful",
            courseId: coursePurchase._id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.get('/purchaseCourses', userCheck, async function(req, res) {
	const userId = req.id;

	try {
		const userPurchases = await purchaseModel.find({ userId });
		const courseIds = userPurchases.map(purchase => purchase.courseId);

		const purchasedCourses = await courseModel.find({
			_id: { $in: courseIds } 
		});

		res.status(200).json({
			userPurchases,
			purchasedCourses
		});
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});

module.exports = { userRouter };
