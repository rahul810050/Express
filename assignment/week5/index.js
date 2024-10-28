const express = require('express')
const app = express()
// const cors = require('cors')

app.use(express.json());
// app.use(cors());

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html')
})


app.post('/sum', function(req, res){
	const a = parseFloat(req.body.a)
	const b = parseFloat(req.body.b)
	res.status(200).json({
		"sum": a+b
	})
})

app.listen(3000)