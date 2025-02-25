import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";

import productsRoutes from "./routes/products.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1313;

const __dirname = path.resolve();
app.use(express.json()) // allow us to accept data in req.body

app.use("/api/products", productsRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log('serverstart at http://localhost:' + PORT)
});
