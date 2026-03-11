import { Router, Request, Response } from "express";
import { Product } from "../types/product.types";
import { v4 as uuidv4 } from "uuid";

let products: Product[] = [];

const productRouter = Router();

// GET all products
productRouter.get("/product", (req: Request, res: Response) => {
  res.status(200).json(products);
});

// POST request to add one project
productRouter.post(
  "/product",
  (req: Request<{}, {}, Omit<Product, "id">>, res: Response) => {
    const { product_name, product_description, product_price } = req.body;
    if (!product_name.trim()) {
      res.status(400).json({
        message: "Missing new product name",
      });
      return;
    }
    const newProduct: Product = {
      id: uuidv4(),
      product_name,
      product_description,
      product_price,
    };
    products = [...products, newProduct];
    res.status(200).json(newProduct);
  },
);

// GET product by id
productRouter.get("/:id", (req: Request<{ id: string }>, res) => {
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
productRouter.put(
  "/:id",
  (req: Request<{ id: string }, {}, Partial<Product>>, res: Response) => {
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
    const updatedProduct: Product = {
      ...products[foundIndex],
      product_name: req.body.product_name ?? products[foundIndex].product_name,
      product_description:
        req.body.product_description ??
        products[foundIndex].product_description,
      product_price:
        req.body.product_price ?? products[foundIndex].product_price,
    };
    products[foundIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
  },
);

// DELETE one product based on id
productRouter.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
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

export default productRouter;
