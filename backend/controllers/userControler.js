import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from '../middleware/catchAsyncError.js';
import ApiFeatures from '../utils/apiFeatures.js';
import {User} from '../models/userModel.js';


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
    console.log(newuser);
    res.status(201).json({
        success: true,
        newuser

    });

});