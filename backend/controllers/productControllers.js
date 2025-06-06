import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
  // Logic to get all products from the database
  try {
    const products = await sql`
    SELECT * FROM products 
    ORDER BY created_at DESC
    `;
    console.log("Fetched products:", products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProductbyID = async (req, res) => {
  // Logic to get a single product by ID from the database
  const { id } = req.params;
  try {
    const product = await sql` 
    SELECT * FROM products WHERE id = ${id}
    `;
    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  // Logic to create a new product in the database
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }
  try {
    const newProduct = await sql`
      INSERT INTO products (name, price, image)
      VALUES (${name}, ${price}, ${image})
      RETURNING *;
    `;
    //Postman

    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  // Logic to update a product by ID in the database
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const updatedProduct = await sql`
    UPDATE products 
    SET name = ${name}, price = ${price}, image = ${image}
    WHERE id = ${id}
    RETURNING *;
  `;

    if (updatedProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updatedProduct[0] });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  // Logic to delete a product by ID from the database
  const { id } = req.params;
  try {
    const deletedProduct = await sql` 
    DELETE FROM products 
    WHERE id = ${id}
    RETURNING *;
  `;
    if (deletedProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
