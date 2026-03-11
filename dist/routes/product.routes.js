"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
let products = [];
const productRouter = (0, express_1.Router)();
// GET all products
productRouter.get("/product", (req, res) => {
    res.status(200).json(products);
});
// POST request to add one project
productRouter.post("/product", (req, res) => {
    const { product_name, product_description, product_price } = req.body;
    if (!product_name.trim()) {
        res.status(400).json({
            message: "Missing new product name",
        });
        return;
    }
    const newProduct = {
        id: (0, uuid_1.v4)(),
        product_name,
        product_description,
        product_price,
    };
    products = [...products, newProduct];
    res.status(200).json(newProduct);
});
// GET product by id
productRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({
            message: "Missing id parameter!",
        });
        return;
    }
    const product = products.find((item) => item.id === id);
    if (!product) {
        res.status(404).json({
            message: "Unable to find item!",
        });
        return;
    }
    res.status(200).json(product);
});
// PUT update one product
productRouter.put("/:id", (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    if (!id) {
        res.status(404).json({ message: "Missing id parameter!" });
        return;
    }
    const foundIndex = products.findIndex((item) => item.id === id);
    if (foundIndex === -1) {
        res.status(404).json({ message: "Item not found!" });
        return;
    }
    const updatedProduct = Object.assign(Object.assign({}, products[foundIndex]), { product_name: (_a = req.body.product_name) !== null && _a !== void 0 ? _a : products[foundIndex].product_name, product_description: (_b = req.body.product_description) !== null && _b !== void 0 ? _b : products[foundIndex].product_description, product_price: (_c = req.body.product_price) !== null && _c !== void 0 ? _c : products[foundIndex].product_price });
    products[foundIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
});
// DELETE one product based on id
productRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const foundIndex = products.findIndex((item) => item.id === id);
    if (foundIndex === -1) {
        res.status(404).json({
            message: `Product id ${id} not found!`,
            success: false,
        });
        return;
    }
    products = products.filter((item) => item.id !== id);
    res.status(200).json({
        message: `Product: ${id} successfully deleted!`,
        success: true,
    });
});
exports.default = productRouter;
