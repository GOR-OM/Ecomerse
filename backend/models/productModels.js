import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter product name"],
        trim : true,
    },
    description : {
        type : String,
        required : [true, "Please enter product description"],
    },
    price : {
        type : Number,
        required : [true, "Please enter product price"],
        maxLength : [8, "Price cannot exceed 8 characters"],
        default : 0.0
    },
    ratings : {
        type : Number,
        default : 0,
        min : [0, "Rating must be atleast 0"],
        max : [5, "Rating cannot exceed 5"]
    },
    images : [
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }
    ],
    category : {
        type : String,
        required : [true, "Please select category for this product"]
        },
    stock : {
        type : Number,
        required : [true, "Please enter product stock"],
        maxLength : [4, "Product cannot exceed 4 characters"],
        default : 1
    },
    numberOfReviews : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true,
                min : [0, "Rating must be atleast 0"],
                max : [5, "Rating cannot exceed 5"]
            },
            comment : {
                type : String,
                required : true
            }
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },


    
});

export const Product = mongoose.model("Product", productSchema);