import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config(); //Read env file
import productRouter from "./routes/product.routes";

const app = express();

// Routes
app.use("/products", productRouter);
// let products: Product[] = [];

// Fallback 404
app.use((req: Request, res: Response) => {
  res.status(404).send("Invalid route!");
});

// Start server
const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("Missing port!");
}
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
