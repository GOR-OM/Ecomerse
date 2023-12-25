import ErrorHandler from "../utils/errorHandler.js";


const errorMiddleware = (err, req, res, next) => {
    let error = { ...err }; // Create a copy to avoid modifying the original error object
    error.statusCode = err.statusCode || 500;
    error.message = err.message || "Internal Server Error";

    // Handle CastError for invalid MongoDB IDs
    if (error.name === "CastError") {
        const message = `Resource not found. Invalid ID: ${error.value}`;
        error.statusCode = 400;
        error.message = message;
    }

    // Handle Mongoose duplicate key error
    if (error.code && error.code === 11000) {
        const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
        error.statusCode = 400;
        error.message = message;
    }

    res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
};

export default errorMiddleware;