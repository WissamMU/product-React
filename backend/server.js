import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productsRoutes from "./routes/products.routes.js"

dotenv.config();

const app = express();

app.use(express.json()) // allow us to accept data in req.body

app.use("/api/products", productsRoutes);

app.listen(1313, () => {
    connectDB();
    console.log('serverstart at http://localhost:1313/')
})
