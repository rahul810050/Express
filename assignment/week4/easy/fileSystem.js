const fs = require('fs')

const express = require('express')

const app = express()

app.get('/file/:filename', function(req,res){
	const name = req.params.filename;
	fs.readFile(name, 'utf-8', function(err,data){
		if(err){
			res.status(500).json({
				msg: "file not found"
			})
		} else{
			res.json({
				data
			})
		}
	})
})


app.listen(4000, function(){
	console.log('server is started on port 4000')
})