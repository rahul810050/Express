const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
}, { timestamps: true });

const adminSchema = new Schema({
    fullname: String,
    email: { type: String, unique: true },
    password: String,
}, { timestamps: true });

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageURL: String,
    creatorId: { type: ObjectId, ref: 'admin' },
}, { timestamps: true });

const purchaseSchema = new Schema({
    courseId: { type: ObjectId, ref: 'courses' },
    userId: { type: ObjectId, ref: 'users' }
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);
const adminModel = mongoose.model('admins', adminSchema);
const courseModel = mongoose.model('courses', courseSchema);
const purchaseModel = mongoose.model('purchases', purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
};
