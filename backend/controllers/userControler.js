import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from '../middleware/catchAsyncError.js';
import ApiFeatures from '../utils/apiFeatures.js';
import { User } from '../models/userModel.js';
import sendToken from '../utils/jwtToken.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

//register user

export const registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const newuser = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilepic.jpg"
        }
    });

    const token = newuser.getJwtToken();

    sendToken(newuser, 201, res);

});


// Login user

export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    //check if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});


//Logout user

export const logoutUser = catchAsyncError(async (req, res, next) => {
    res.status(200)
        .clearCookie("token")
        .json({
            success: true,
            message: "Logged out successfully"
        });
});


// Forgot password
export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/users/resetpassword/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetasswordToken = undefined;
        user.resetpasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});


// Reset Password

export const resetPassword = catchAsyncError(async (req, res, next) => {
    const resetToken = req.params.token;

    if (!resetToken) {
        return next(new ErrorHandler("Reset token is missing", 400));
    }

    const resetTokenHash = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const user = await User.findOne({
        resetpasswordToken: resetTokenHash,
        resetpasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Password reset token is invalid or has been expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    // Setup new password
    user.password = req.body.password;
    user.resetpasswordToken = undefined;
    user.resetpasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});


// Get currently logged in user details

export const getUserProfile = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
        success: true,
        user
    });
});

// Update password 

export const updatePassword = catchAsyncError(async (req, res, next) => {

    const  user  = await User.findById(req.user.id).select("+password");

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    // Check new password
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);

});


// update profile 

export const updateProfile = catchAsyncError(async (req, res, next) => {

    
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    
    const  user  = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    }) ;

    
    await user.save();

    res.status(200).json({
        success: true,
    });



});


// get all users  (admin)


export const getAllUsers = catchAsyncError(async (req, res, next) => {

    const user = await User.find();

    res.status(200).json({
        success: true,
        user
    });
});


// get user details (admin)

export const getUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`user not exist with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user
    });

});


