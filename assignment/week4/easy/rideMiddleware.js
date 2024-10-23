const express = require('express')

const app = express()

function isOldEnoughMiddleWare(req, res, next){
	const age = Number(req.query.age);
	if(age >= 15){
		next()
	} else{
		res.status(411).json({
			msg: "sorry you are not old yet"
		})
	}
}

app.get('/ride1', isOldEnoughMiddleWare, function(req, res){
	res.json({
		msg: "you have succesfully riden the ride 1"
	})
})

app.get('/ride2', isOldEnoughMiddleWare, function(req, res){
	res.json({
		msg: "you have successfully riden the ride 2"
	})
})

app.listen(3000, function(){
	console.log('the server is on port 3000')
})