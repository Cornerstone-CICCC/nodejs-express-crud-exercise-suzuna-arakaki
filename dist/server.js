"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); //Read env file
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const app = (0, express_1.default)();
// Routes
app.use("/products", product_routes_1.default);
// let products: Product[] = [];
// Fallback 404
app.use((req, res) => {
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
