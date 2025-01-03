const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json());

async function userChecker(req, res, next){
	const token = req.headers.token;
	if(typeof token === 'undefined'){
		return res.status(404).json({
			msg: 'you are not logged in'
		})
	}
	try{
		const verified = await jwt.verify(token, 'secret');
		req.id = verified.id;
		next();
	} catch(error){
		res.status(404).json({
			error: error.message
		})
	}
}

module.exports = { userChecker };