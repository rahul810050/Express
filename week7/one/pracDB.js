const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = Schema({
	username: String,
	email: String,
	password: String
})

const Todo = Schema({
	description: String,
	completed: Boolean,
	userId: ObjectId
})

const UserModel = mongoose.model('users', User)
const TodoModel = mongoose.model('todos', Todo)

module.exports = {UserModel,TodoModel}