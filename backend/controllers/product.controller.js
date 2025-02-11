import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        // Attempt to retrieve all products from database
        const products = await Product.find({});
        // ^ Mongoose find() with empty filter returns all documents

        // Send response with fetched products
        res.status(200).json(({ success: true, data: products }))
    } catch (e) {
        // Error handling
        res.status(500).json({ success: false, message: "Server Error" })  // Immediate response
        console.log("Error in fetching Products: " + e.message);  // Logging after sending response
        // ^ Log statement will execute after response is sent
        // ^ Might not capture errors effectively due to execution order
    }
}

export const createProducts = async (req, res) => {
    // Extract product data from request body
    const product = req.body;  // Expects { name, price, image } in JSON format

    // Basic validation check
    if (!product.name || !product.price || !product.image) {
        // Return 400 Bad Request if any required field is missing
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields: name, price, image'
        });
    }

    // Create new Mongoose document instance
    const newProduct = new Product(product);  // Uses the Product model we defined

    try {
        // Save to MongoDB database
        await newProduct.save();  // Async database operation

        // Return 201 Created status on success
        res.status(201).json({
            success: true,
            data: newProduct  // Returns the created product with _id and timestamps
        });

    } catch (e) {
        // Handle database errors
        console.error("Error creating product: ", e.message);

        // Return 500 Internal Server Error
        res.status(500).json({
            success: false,
            message: "Server error occurred while creating product"
        });
    }
}

export const updateProducts = async (req, res) => {
    // Extract ID from URL parameters
    const { id } = req.params;
    // Get update data from request body
    const product = req.body;

    // Validate MongoDB ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "invalid Product ID"  // Returns 404 for invalid format
        });
    }

    try {
        // Attempt to find and update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            product,  // Update with request body data
            { new: true }  // Return updated document instead of original
        );

        // Success response with updated product
        res.status(200).json({
            success: true,
            data: updatedProduct  // Could be null if ID wasn't found
        });

    } catch (e) {
        // Handle database errors
        res.status(500).json({
            success: false,
            message: "Server Error"  // Generic error message
        });
        // Log error after sending response
        console.log("Server Error : " + e.message);
    }
}

export const deleteProducts = async (req, res) => {
    // Extract ID from URL parameters its called id because we did:id if it was :somthingElse it would be somthingElse
    const { id } = req.params;

    try {
        // Attempt to delete the product by ID
        await Product.findByIdAndDelete(id);  // Mongoose method to find and remove document

        // If deletion succeeds, send success response
        res.status(200).json({
            success: true,
            message: "Product deleted"
        });

    } catch (e) {
        // If error occurs during deletion
        res.status(404).json({
            success: false,
            message: "Product not found"
        });
        console.log("Error in deleting Products: " + e.message)
    }
}