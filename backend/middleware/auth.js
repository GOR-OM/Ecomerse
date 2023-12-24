import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js";
const isAuth = catchAsyncError(async (req,res,next) =>{
    const { token } = await req.cookies;
    if (!token) {
        return next(new ErrorHandler("Login first to access this resource.",401));
    }


    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();


}) 

export default isAuth;


export const authorizeRole = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`,403));
        }
        next();
    }
}