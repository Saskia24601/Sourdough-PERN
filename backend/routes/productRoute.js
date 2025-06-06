import express from "express"; // Importing express for routing

import {
  getProducts,
  createProduct,
  getProductbyID,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js"; // Importing product controller functions

const router = express.Router();

router.get("/", getProducts); // Route to get all products
router.get("/:id", getProductbyID); // Route to get a single product by ID
router.post("/", createProduct); // Route to create a new product
router.put("/:id", updateProduct); // Route to update a product by ID
router.delete("/:id", deleteProduct); // Route to delete a product by ID

export default router; // Exporting the router to be used in server.js
