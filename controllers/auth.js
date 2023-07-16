const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) =>{
    const token = user.getSignedJwtToken(res);
    res.status(statusCode).json({sucess: true, token})
}
exports.register = async(req,res,next) =>{
    const {username, email, password} = req.body;
    const existing_email = await User.findOne({email})
    if(existing_email){
        return next(new ErrorResponse("Email already existed", 402))
    }
    try{
        const user =  await User.create({username, email, password});
        sendToken(user, 201, res)
    }catch(err){
        next(err)
    }
}
exports.login = async(req,res,next)=>{
    const {email, password} =  req.body
    if(!email ||!password){
        return next(new ErrorResponse("Please provide an email and password",400))
    }
    try{
  // check already exists by email
  const user = await User.findOne({email}).select("password")
  if(!user){
    return next(new ErrorResponse("Invalid credentials, User doesn't exist",401))
  }
  //check password matches
  const isMatch = await user.matchPasswords(password)
  if(!isMatch){
    return next(new ErrorResponse("Invalid credentials",401))
  }
  sendToken(user,200,res)
    } catch(err){
        next(err)
    }
      
    
}

exports.logout = async(req,res) =>{
    res.clearCookie('refreshToken');
    return res.status(200).json({success: true, message: "Logged out"})
} 