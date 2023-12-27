import { Order } from "../models/orederModels.js";
import { Product } from "../models/productModels.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from '../middleware/catchAsyncError.js';
import ApiFeatures from '../utils/apiFeatures.js';


// Create a new order   =>  /api/v1/order/new

export const newOrder = catchAsyncError(async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });

});