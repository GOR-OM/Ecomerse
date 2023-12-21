import { Product } from '../models/productModels.js';



// Create product 



export const createProduct = async (req, res,next) => {   // Admin only can create product
    const product = await Product.create(req.body);
    
    res.status(201).json({
        success: true,
        product
    });
};


export const getAllProducts = async (req, res) => { // all users can see all products
    const products = await Product.find({});

    res.status(201).
    json({
        success: true,
        products
    });

};


export const updateProduct = async (req, res,next) => { // Admin only can update product
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
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

};


export const deleteProduct = async (req, res,next) => { // Admin only can delete product
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    await product.deleteOne();
    res.status(201).json({
        success: true,
        message: "Product is deleted"
    });

};

// get product details 

export const getProductDetails = async (req, res,next) => { // all users can see product details
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    res.status(201).json({
        success: true,
        product
    });
};