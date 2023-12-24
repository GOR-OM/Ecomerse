import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

// jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id : this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRES_TIME
    });
}

// COMPARE USER PASSWORD

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


// update password token 

userSchema.methods.getResetPasswordToken = function(){

 // Generating Token
 const resetToken = crypto.randomBytes(20).toString("hex");

 // Hashing and adding resetPasswordToken to userSchema
 this.resetPasswordToken = crypto
   .createHash("sha256")
   .update(resetToken)
   .digest("hex");

 this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

 return resetToken;

}   



export const User = mongoose.model("User",userSchema);