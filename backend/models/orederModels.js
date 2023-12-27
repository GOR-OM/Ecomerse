import mongoose from "mongoose";

const orderSchema = mongoose.Schema({

    ShippingInfo : {
        address : {
            type : String,
            required : true
        },
        city : {
            type : String,
            required : true
        },
        phoneNo : {
            type : String,
            required : true,
            validate: [
                {
                    validator: function (value) {
                        // Check if the phone number has exactly 10 digits
                        return /^\d{10}$/.test(value);
                    },
                    message: "Phone number must be 10 digits.",
                },
                {
                    validator: function (value) {
                        // Check if the phone number starts with 6, 7, 8, or 9
                        return /^[6-9]\d{9}$/.test(value);
                    },
                    message: "Phone number is invalid.",
                },
            ],
        },
        postalCode : {
            type : String,
            required : true
        },
        
    },

    orderItems : [
        {
            name : {
                type : String,
                required : true
            },
            quantity : {
                type : Number,
                required : true
            },
            image : {
                type : String,
                required : true
            },
            price : {
                type : Number,
                required : true
            },
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product",
                required : true
            }
        }
    ],

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    paymentInfo : {
        id : {
            type : String,
        required : true
        },
        status : {
            type : String,
        required : true
            
        }
    },
    paidAt : {
        type : Date,
        required : true
    },

    itemsPrice : {
        type : Number,
        required : true,
        default : 0.0
    },
    taxPrice : {
        type : Number,
        required : true,
        default : 0.0
    },
    shippingPrice : {
        type : Number,
        required : true,
        default : 0.0
    },
    totalPrice : {
        type : Number,
        required : true,
        default : 0.0
    },

    orderStatus : {
        type : String,
        required : true,
        default : "Processing"
    }, 
    deliveredAt : {
        type : Date
    },
    createdAt : {
        type : Date,
        default : Date.now
    }

});

export const Order =  mongoose.model("Order", orderSchema);
