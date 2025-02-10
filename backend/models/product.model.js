import mongoose from "mongoose";
// Import Mongoose library for MongoDB object modeling and schema creation

const productSchema = new mongoose.Schema({
    // Define product schema structure with validation rules
    // This blueprint ensures all product documents follow the same format
    
    name: {
        type: String,        // Field type: String (text data)
        required: true      // Mandatory field validation
        // Ensures products can't be created without a name
    },
    price: {
        type: Number,       // Field type: Number (numeric value)
        required: true      // Price must be provided
        // Validates against missing pricing information
    },
    image: {
        type: String,       // Field type: String (typically stores URL)
        required: true      // Image reference is compulsory
        // Ensures products have associated visual representation
    },
}, 
{
    timestamps: true        // Automatic date tracking configuration
    // Adds two auto-managed fields:
    // - createdAt: Initial creation date/time
    // - updatedAt: Last modification date/time
});

// Create Mongoose model from the schema
const Product = mongoose.model('Product', productSchema);
// Parameters:
// 1. Model name ('Product') - becomes collection name in MongoDB
//    (Mongoose auto-pluralizes to 'products' collection)
// 2. Schema reference (productSchema)
// This model enables CRUD operations on product documents

export default Product;
// Export the model for use in other application components
// Can be imported in controllers/services to interact with products collection