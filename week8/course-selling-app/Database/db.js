const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const userSchema = new Schema({
	username: {type: String},
	email: {type: String, unique: true},
	password: {type: String}
})

const adminSchema = new Schema({
	fullname: {type: String},
	email: {type: String},
	password: {type: String}
})

const courseSchema = new Schema({
	title: String,
	description: String,
	price: Number,
	creatorid: Schema.ObjectId,
	imageURL: String
})

const purchaseSchema = new Schema({
	creatorid: Schema.ObjectId,
	userid: Schema.ObjectId
})


const userModel = mongoose.model('users', userSchema);
const adminModel = mongoose.model('admins', adminSchema);
const courseModel = mongoose.model('courses', courseSchema);
const purchaseModel = mongoose.model('purchases',purchaseSchema);


module.exports = {
	userModel: userModel,
	courseModel: courseModel,
	adminModel: adminModel,
	purchaseModel: purchaseModel
}