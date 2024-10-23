const express = require('express')

const app = express()

let numOfRequestCount = {}

setInterval(() => {
	numOfRequestCount = {}
}, 5000);

function requestCountLimit(req, res, next){
	const userId = req.header["user-id"]
	if(numOfRequestCount[userId]){
		numOfRequestCount[userId]++;
		if(numOfRequestCount[userId] > 5){
			res.status(411).json({
				msg: "you had only 5 request access"
			})
		} else{
			next();
		}
	} else{
		numOfRequestCount[userId] = 1;
	}
}


app.use(requestCountLimit);

app.get('/', function(req, res){
	res.json({
		msg : "hey there"
	})
})

app.listen(3000)