const mongoose 			= require('mongoose');


const UserSchema = new mongoose.Schema({
	email: String,
	password: String,
	token: String

}, {
	timestamps: true,
	collection: 'Users',
});

module.exports = mongoose.model('User', UserSchema);