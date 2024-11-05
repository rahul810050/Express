const {adminModel, courseModel} = require('../database/db');
const express = require('express');
const adminRouter = express.Router();
const {z} = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {adminCheck} = require('../middleware/adminCheck')
require('dotenv').config();


adminRouter.post('/signup', async function(req, res){
	const requiredBody = z.object({
		fullname: z.string().min(3).max(30),
		email: z.string().email(),
		password: z.string().min(6)
	})

	const parseBody = requiredBody.safeParse(req.body);

	if(!parseBody.success){
		res.status(403).json({
			msg: "Incorrect credential",
			error: parseBody.success.error,
		})
	}

	const {fullname, email, password} = req.body

	const hashedPass = await bcrypt.hash(password, 10);

	const existUser = await adminModel.findOne({
		email: email
	})

	if(existUser){
		return res.status(300).json({
			msg: "user already exist"
		})
	}

	const newUser = {
		fullname: fullname,
		email: email,
		password: hashedPass
	}

	try{
		await adminModel.create(newUser);
		res.status(200).json({
			msg: "Registration successful"
		})
	} catch(error){
		res.status(404).json({
			error: error.message
		})
	}
})


adminRouter.post('/signin', async function(req, res){
	const {email, password} = req.body;
	// console.log(req.body)

	if(typeof email === 'undefined' || typeof password === 'undefined'){
		return res.status(403).json({
			msg: "Please provide email and password"
		})
	}

	const user = await adminModel.findOne({
		email: email
	})

	if(!user){
		return res.status(404).json({
			msg: "user does not exist go to sign up"
		})
	}

	const payload = {
		id: user._id
	}

	try{
		const token = jwt.sign(payload, process.env.JWT_SECRET);
		res.status(200).json({
			msg: "login successful",
			token: token
		})
	} catch(error){
		res.status(404).json({
			error: error.message
		})
	}
})

adminRouter.post('/course', adminCheck, async function(req, res){
	const {title, description, price, imageURL} = req.body;

	if(typeof title === 'undefined' || typeof description === 'undefined' || typeof price === 'undefined' || typeof imageURL === 'undefined'){
		return res.status(403).json({
			msg: "Please provide all the required details"
		})
	}

	const id = req.id;

	const newCourse = {
		title: title,
		description: description,
		price: price,
		imageURL: imageURL,
		creatorId: id,
	}
	try{
		await courseModel.create(newCourse);
		res.status(200).json({
			msg: "course added successfully"
		})
	} catch(error){
		res.status(404).json({
			error: error.message
		})
	}
})

module.exports = {
	adminRouter: adminRouter
}