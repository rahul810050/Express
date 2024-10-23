const express = require('express')

const app = express()

let errorCounter = 0;

function errorCountMiddleWare(err , req, res, next){
	res.status(404).json({})
	errorCounter++;
}

app.use(errorCountMiddleWare);

app.get('/user', function(req, res){
	throw new Error("something errory")
})