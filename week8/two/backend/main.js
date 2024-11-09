const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = express();
const {userRouter} = require('./routes/user')
const {adminRouter} = require('./routes/admin')
const {courseRouter} = require('./routes/course')
require('dotenv').config();

app.use(express.json())

app.use('/api/v1/user',userRouter);
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/course', courseRouter)


async function main(){
	try{
		await mongoose.connect(process.env.MONGO_URL)
		console.log('database got connected')

		app.listen(process.env.PORT, function(){
			console.log('server is running on port', process.env.PORT)
		})
	} catch(error){
		console.log('error while connecting the database');
	}
}
main()