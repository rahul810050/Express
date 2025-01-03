const express = require('express')
const {userModel, purchaseModel, courseModel} = require('../database/db')
const userRouter = express.Router();
const {z} = require('zod')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { userChecker } = require('../middleWare/userChecker')

const app = express();
app.use(express.json());

userRouter.post('/signup',async function(req, res){
	const requiredBody = z.object({
		username: z.string().min(3).max(100),
		email: z.string().email(),
		password: z.string().min(6)
	})

	const bodyParse = requiredBody.safeParse(req.body)
	if(!bodyParse.success){
		return res.status(400).json({
			msg: 'incorrect credentials',
			error: bodyParse.error
		})
	}

	const {username, email, password} = req.body
	const hashedPass = await bcrypt.hash(password, 5);
	const existEmail = await userModel.findOne({email})

	if(existEmail){
		return res.status(500).json({
			msg: 'user already exist go to Login'
		})
	}

	const newUser = {
		username: username,
		email: email,
		password: hashedPass
	}

	try{
		await userModel.create(newUser);
		res.status(200).json({
			msg: 'account created successfully'
		})
	} catch(error){
		res.status(404).json({
			error: error.message
		})
	}

})

userRouter.post('/signin', async function(req, res){
	const {email, password} = req.body

	if(typeof email === 'undefined' || typeof password === 'undefined'){
		return res.status(500).json({
			msg: 'Please enter all fields'
		})
	}

	const existEmail = await userModel.findOne({email});

	if(!existEmail){
		return res.status(500).json({
			msg: 'User does not exist. Please sign up first'
		})
	}

	const isPassValid = await bcrypt.compare(password, existEmail.password);
	if(!isPassValid){
		return res.status(500).json({
			msg: 'Incorrect password'
		})
	}

	try{
		const token = jwt.sign({id: existEmail._id}, 'secret');
		res.status(200).json({
			msg: "Login Successfull",
			token: token
		})
	} catch(error){
		res.status(404).json({
			error: error.message
		})
	}
})

userRouter.get('/purchaseCourse', userChecker, async function(req, res){
	const id = req.id;

	try{
		const purchaseCourse = courseModel.find({ userid: id});
		res.status(200).json({
			courses: purchaseCourse
		})
	} catch(error){
		res.status(404).json({
			error: error.message
		})
	}
})

module.exports = { userRouter }