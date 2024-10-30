const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId

const User = new Schema({
	username: String,
	email: String,
	password: String
})

const Todo = new mongoose.Schema({
	description: String,
	completed: Boolean,
	userid: ObjectId
})

const UserModel = mongoose.model('users', User)
const TodoModel = mongoose.model('todos', Todo)


module.exports = {
	UserModel: UserModel,
	TodoModel: TodoModel
}