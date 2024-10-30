const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const jwtSecret = 'secret'
const {UserModel, TodoModel} = require('./DataBase')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://rahul810050:Rahul%40naskar%40123@cluster0.sa000.mongodb.net/todo-app-database')

app.use(express.json());

app.post('/signup',async function(req, res){
	const {username, email, password} = req.body

	await UserModel.create({
		username: username,
		email: email,
		password: password
	})
	res.json({
		msg: "you have successfully signed up"
	})
})


app.post('/signin', async function(req, res){
	const { email, password} = req.body

	const user = await UserModel.findOne({
		email: email,
		password: password
	})

	if(user){
		const token = jwt.sign({
			id: user._id.toString()
		}, jwtSecret);
		res.status(200).json({
			token : token
		})
	} else{
		res.status(403).json({
			msg: "wrong credential"
		})
	}
})


app.post('/todo', auth, function(req, res){
	const id = req.id;
	res.status(200).send(id)
})

app.get('/todos', auth, function(req, res){
	const id = req.id
	res.status(200).send(id);
})


function auth(req, res, next){
	const token = req.headers.token;
	if (!token) {
		return res.status(403).json({ error: "No token provided" });
	}
	try{
		const verified = jwt.verify(token, jwtSecret);
		console.log(verified.id)
		req.id = verified.id
		next();
	} catch(error){
		res.status(403).json({
			error: error.message
		})
	}
}

app.listen(3000)