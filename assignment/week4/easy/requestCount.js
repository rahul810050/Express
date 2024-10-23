const express = require('express')

const app = express()

let requestCounter = 0

function requestCount(req, res, next){
	if(req){
		requestCounter++;
		console.log(requestCounter)
		next()
	}
}

app.use(requestCount)

app.get('/user', function(req, res){
	res.status(200).json({
		msg: "hey user"
	})
})

app.listen(3000)