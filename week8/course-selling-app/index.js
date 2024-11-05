const express = require('express');
const app = express();
const mongoose = require('mongoose')

const { courseRouter} = require('./routes/course')
const { userRouter} = require('./routes/user')
const {adminRouter} = require('./routes/admin')

// createCourseRoute(app);
// createUserRoute(app);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/course', courseRouter);


// app.use('/api/v1', courseRouter); // when ever there is another version of courese router then we dont have to change the whole course router we have to change the api/v1 --> api/v2 than's it.....


async function main(){
	await mongoose.connect('mongodb+srv://rahul810050:Rahul%40naskar%40123@cluster0.sa000.mongodb.net/course-selling-app', function(){
		console.log('database got connected')
	})

	app.listen(3000, function(){
		console.log('the server is running on port 3000')
	})
}

main()