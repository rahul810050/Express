const {Router} = require('express')

const courseRouter = Router();

	courseRouter.post('/purchase', function(req, res){
		res.json({
			msg: "it is purchase"
		})
	})

	courseRouter.get('/preview', function(req, res){
		res.json({
			msg: "it is preview"
		})
	})


module.exports = {
	courseRouter: courseRouter
}