const express = require('express')
const courseRouter = express.Router();
const {courseModel} = require('../database/db');
const {courseCheck} = require('../middleware/courseCheck')

// purchased courses
courseRouter.get('/purchase',courseCheck, async function(req, res){
	const userid = req.id;
	// const user = await userModel.findById({_id: userid})
	try{
		const allPurchasedCourses = await courseModel.find({userid: userid});
		res.status(200).json({allPurchasedCourses});
	} catch(error){
		res.status(404).json({
			error: error.message
		})
	}
})


// current available courses
courseRouter.get('/preview', async function(req, res){
	try{
		const allCourses = await courseModel.find({}).toArray();
		res.status(200).json({allCourses})
	}catch(error){
		res.status(404).json({
			error: error.message
		})
	}
})

module.exports = {
	courseRouter
}