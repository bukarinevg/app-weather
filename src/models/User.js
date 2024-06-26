const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const { use } = require('../routes');

const userSchema = new mongoose.Schema({
    // email: {
    //     type: String,
    //     required: [true, 'Please enter an email'],
    //     unique: true,
    //     lowercase: true,
    // },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
        lowercase: true, 
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});
//hooks
// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// fire a function after doc saved to db
userSchema.post('save', function(doc, next) {
    console.log('new user was created & saved', doc);
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;