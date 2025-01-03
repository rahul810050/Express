const express = require('express')
const app = express();
const { userRouter } = require('./routes/user')
const mongoose = require('mongoose')

app.use(express.json())

app.use('/api/v1/users', userRouter);


async function main(){
	try{
		await mongoose.connect('mongodb+srv://rahul810050:Rahul%40naskar%40123@cluster0.sa000.mongodb.net/Practice');
		console.log('Database got connected');
		
		app.listen(3000, function(){
			console.log('the server is on port 3000');
			
		})
	} catch(error){
		console.log('error while connecting the database');
	}
}

main()