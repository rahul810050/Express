// const express = require('express');
// const Router = express.Router;

const {Router} = require('express')

const userRouter = Router();



	userRouter.post('/signup', function(req, res){
		res.json({
			msg: "it is signup"
		})
	})

	userRouter.post('/signin', function(req, res){
		res.json({
			msg: "it is signin"
		})
	})


module.exports = {
	userRouter: userRouter
}