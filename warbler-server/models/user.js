const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    }
});

userSchema.pre('save', async function() {
    try {
        if(!this.isModified('password')) {
            return next();
        }
        let hashedPassword = bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch(err) {
        next(err);
    }
});

userSchema.method.comparePassword = async function(cadidatePassword, next) {
        try {
            let isMatch = await bcrypt.compare(cadidatePassword, this.password);
            return isMatch;
        } catch (err) {
            return next(err);
        }
};

const User = mongoose.model('User', userSchema);

module.exports = User;