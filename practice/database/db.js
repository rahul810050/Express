const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
	username: String,
	email: {type: String, unique: true},
	password: String
})
const adminSchema = new Schema({
	username: String,
	email: {type: String, unique: true},
	password: String
})
const courseSchema = new Schema({
	title: String,
	description: String,
	price: Number,
	imageURL: String,
	creatorId: {type: ObjectId, ref: 'admin'}
})
const purchaseSchema = new Schema({
	userId: {type: ObjectId, ref: 'user'},
	courseId: {type: ObjectId, ref: 'course'}
})


const userModel = mongoose.model('users', userSchema)
const adminModel = mongoose.model('admin', adminSchema)
const courseModel = mongoose.model('courses', courseSchema)
const purchaseModel = mongoose.model('purchase', purchaseSchema)

module.exports = {
	userModel,
	adminModel,
	courseModel,
	purchaseModel
}