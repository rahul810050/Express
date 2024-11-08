const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config();

async function courseCheck(req, res, next){
	const token = req.headers.token;
	if(!token){
		return res.status(404).json({
			msg: "token not found"
		})
	}

	try{
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.id = verified.id;
		next()
	} catch(error){
		res.status(400).json({
			error: error.message
		})
	}
}

module.exports = {
	courseCheck
}