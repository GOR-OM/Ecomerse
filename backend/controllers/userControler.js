import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from '../middleware/catchAsyncError.js';
import ApiFeatures from '../utils/apiFeatures.js';
import {User} from '../models/userModel.js';
import sendToken from '../utils/jwtToken.js';

//register user

export const registerUser = catchAsyncError( async (req, res,next) => {
    const {name,email,password} = req.body;

    const newuser = await User.create({
        name,email,password,
        avatar:{
            public_id: "this is a sample id",
            url: "profilepic.jpg"
        }
    });
    
    const token = newuser.getJwtToken();

   sendToken(newuser,201,res);

});


// Login user

export const loginUser = catchAsyncError( async (req, res,next) => {
    const {email,password} = req.body;

    //check if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user,200,res);
});


//Logout user

export const logoutUser = catchAsyncError( async (req, res,next) => {
    res.status(200)
    .clearCookie("token")
    .json({
        success: true,
        message: "Logged out successfully"
    });
});