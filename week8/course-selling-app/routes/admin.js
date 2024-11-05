const {Router} = require('express')

const adminRouter = Router();
const {adminModel} = require('../Database/db')

adminRouter.post('/signup', function(req, res){
	res.json({
		msg: "it is admin signup"
	})
})

adminRouter.post('/signin', function(req, res){
	res.json({
		msg: "it is admin signin"
	})
})

adminRouter.post('/course', function(req, res){
	res.json({
		msg: "it is admin course creation"
	})
})

adminRouter.put('/course', function(req, res){
	res.json({
		msg: "it is admin course update"
	})
})

adminRouter.delete('/course', function(req, res){
	res.json({
		msg: "it is to delete any courses by admin"
	})
})

adminRouter.get('/course/bulk', function(req, res){
	res.json({
		msg: "it is admin bulk courses"
	})
})

module.exports = {
	adminRouter: adminRouter
}