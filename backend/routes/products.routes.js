import express from "express";
import { getProducts , createProductss , updateProducts ,deleteProducts} from "../controllers/product.controller.js";

const router = express.Router();

// Handle GET requests to fetch all products
router.get("/", getProducts);

// Handle POST requests to create new products
router.post("/", createProductss);

// Handle PUT requests to update a product by ID
router.put("/:id", updateProducts);

// Handle DELETE requests to remove a product by ID 
router.delete("/:id",deleteProducts);

export default router;