import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json())

// Handle POST requests to create new products
app.post("/api/products", async (req, res) => {
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
});

app.listen(1313, () => {
    connectDB();
        console.log('serverstart at http://localhost:1313/')
})

