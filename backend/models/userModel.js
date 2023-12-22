import mongoose from "mongoose";
import validator from "validator";

const userSchema =new mongoose.Schema({

    name : {
        type : String,
        required : [true, "Please enter your name"],
        maxLength : [30, "Your name cannot exceed 30 characters"],
        minLength : [4, "Your name must be longer than 4 characters"]  
    },
    email : {
        type : String,
        required : [true, "Please enter your email"],
        unique : true,
        validate : [validator.isEmail, "Please enter valid email address"]
    },
    password : {
        type : String,
        required : [true, "Please enter your password"],
        minLength : [8, "Your password must be longer than 8 characters"],
        maxLength : [12, "Your password cannot exceed 12 characters"],
        select : false
    },

    avatar : {
        public_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    },

    role : {
        type : String,
        default : "user"
    },

    resetpasswordToken : String,
    resetpasswordExpire : Date



});

export const User = mongoose.model("User",userSchema);