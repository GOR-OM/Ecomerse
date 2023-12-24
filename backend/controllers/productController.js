import { Product } from '../models/productModels.js';
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from '../middleware/catchAsyncError.js';
import ApiFeatures from '../utils/apiFeatures.js';

// Create product 



export const createProduct = catchAsyncError( async (req, res,next) => {   // Admin only can create product
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    
    res.status(201).json({
        success: true,
        product
    });
});


    const productsPerPage = 5;


export const getAllProducts = catchAsyncError( async (req, res) => { // all users can see all products
    const apifeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(productsPerPage);
    
    const products = await apifeature.query;
    const count = await Product.countDocuments(); 
    
    res.status(201).
    json({
        success: true,
        products,
        count
    });


});


export const updateProduct = catchAsyncError( async (req, res,next) => { // Admin only can update product
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,
    {
        new: true, 
        runValidators: true,
        useFindAndModify: false
    });

    res.status(201).json({
        success: true,
        product
    });

});


export const deleteProduct =catchAsyncError( async (req, res,next) => { // Admin only can delete product
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    await product.deleteOne();
    res.status(201).json({
        success: true,
        message: "Product is deleted"
    });

});

// get product details 

export const getProductDetails =catchAsyncError( async (req, res,next) => { // all users can see product details
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(201).json({
        success: true,
        product
    });
});