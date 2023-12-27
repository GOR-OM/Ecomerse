import { Order } from "../models/orederModels.js";
import { Product } from "../models/productModels.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from '../middleware/catchAsyncError.js';
import ApiFeatures from '../utils/apiFeatures.js';
import mongoose from "mongoose";

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

// get signle order   =>   /api/v1/order/:id

export const getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404));
    }

    res.status(200).json({
        success: true,
        order,
    });

});


// get logged in user orders   =>   /api/v1/orders/me

export const myOrders = catchAsyncError(async (req, res, next) => {
    console.log(req.user._id);
    const orders = await Order.find({ user: req.user._id });

    if (orders.length === 0) {
        return next(new ErrorHandler('No orders found for this user', 404));
    }

    res.status(200).json({
        success: true,
        orders,
    });

});

// get all orders - ADMIN  =>   /api/v1/admin/orders/

export const allOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });

});

// update / process order - ADMIN  =>   /api/v1/admin/order/:id

export const updateOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status

    if(req.body.status === 'Delivered'){
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message : `Order updated successfully of ${order.user.name}`
    });

});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false });
}


// delete order   =>   /api/v1/admin/order/:id

export const deleteOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Order is deleted successfully.',
    });

});