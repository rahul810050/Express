const { userModel, purchaseModel, courseModel } = require('../database/db');
const express = require('express');
const userRouter = express.Router();
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userCheck } = require('../middleware/userCheck');
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
		// console.log(res.body)

    const hashedPass = await bcrypt.hash(password, 10);

    const existUser = await userModel.findOne({ email: email });

    if (existUser) {
        return res.status(409).json({
            msg: "User already exists"
        });
    }

    const newUser = {
        username: username,
        email: email,
        password: hashedPass
    };

    try {
        await userModel.create(newUser);
        res.status(200).json({
            msg: "Registration successful"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

userRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(403).json({
            msg: "Please provide email and password"
        });
    }

    const user = await userModel.findOne({ email: email });

    if (!user) {
        return res.status(404).json({
            msg: "User does not exist, please sign up"
        });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(403).json({
            msg: "Incorrect password"
        });
    }

    try {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            msg: "Login successful",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

userRouter.post('/purchase', userCheck, async function (req, res) {
    const { creatorId } = req.body;
    if (!creatorId) {
        return res.status(400).json({
            msg: "Creator ID is required for purchases."
        });
    }

    const userId = req.id;

    const newBuyer = {
        creatorId: creatorId,
        userId: userId
    };

    try {
        await purchaseModel.create(newBuyer);
        res.status(200).json({
            msg: "Purchase successful"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


userRouter.get('/purchaseCourses', async function(req, res){
	const userid = req.id;

	try{
		const courses = await courseModel.find({userid: userid});
		console.log(courses);
		res.status(200).json({
			courses
		})
	} catch(error){
		res.status(404).json({
			error: error.message
		})
	}
})

module.exports = {
    userRouter: userRouter
};
