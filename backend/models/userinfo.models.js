const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: Number,
    age: Number,
    sex: String,
    income: Number,
    numFamilyMembers: Number,
    numOver65: Number,
    numChildren: Number,
    preexistingConditions: Array,
});


const User = mongoose.model('User', UserSchema);

module.exports = User;