const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match:[/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Please provide a valid email"]
    },
    password: {
        type:String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    customerId: {
        type: String,
        default:""
    },
    subscription: {
        type: String,
        default:""
    }

})

// hash the password before saving to database

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password =  await bcrypt.hash(this.password,salt);
    next()
})

userSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password)
}

//sign JWT and return
userSchema.methods.getSignedJwtToken = function(res){
    const accessToken = jwt.sign({id: this._id}, process.env.JWT_ACCESS_SECRET, {expiresIn: '15min'});
    const refreshToken = jwt.sign({id: this._id}, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'});
    res.cookie('refreshToken', `${refreshToken}`,{maxAge: 86400 * 7000, httpOnly: true})
    return {accessToken, refreshToken}
}

const User = mongoose.model("User", userSchema);

module.exports = User;