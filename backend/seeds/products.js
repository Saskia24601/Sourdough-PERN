import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
  {
    name: "Sourdough White 800g",
    price: 5.0,
    image:
      "https://images.unsplash.com/photo-1620921586333-b7566c34550a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c291cmRvdWdofGVufDB8fDB8fHww",
  },
  {
    name: "Sourdough Wholemeal 800g",
    price: 6.0,
    image:
      "https://images.unsplash.com/photo-1613396874083-2d5fbe59ae79?q=80&w=1919&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sourdough Rye 800g",
    price: 6.5,
    image:
      "https://images.unsplash.com/photo-1638788449271-9bb9121c1bfc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNvdXJkb3VnaHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Sourdough Multigrain 800g",
    price: 6.0,
    image:
      "https://images.unsplash.com/photo-1675092637098-363c551547c0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c291cmRvdWdoJTIwYnJvd258ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Sourdough Seeded 800g",
    price: 6.5,
    image:
      "https://images.unsplash.com/photo-1689855468472-250ab81cbd73?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c291cmRvdWdoJTIwc2VlZHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Sourdough Olive 800g",
    price: 6.0,
    image:
      "https://static.wixstatic.com/media/c93e57_e2949c3bc9f842598a708d4027c35fd7~mv2.jpg/v1/fill/w_1000,h_1334,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c93e57_e2949c3bc9f842598a708d4027c35fd7~mv2.jpg",
  },
  {
    name: "Sourdough Bagels",
    price: 1.5,
    image:
      "https://static.wixstatic.com/media/c93e57_f046a7e735814d4d8c814e45f8da741e~mv2.jpg/v1/fill/w_1000,h_1334,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c93e57_f046a7e735814d4d8c814e45f8da741e~mv2.jpg",
  },
];

async function seedDatabase() {
  try {
    // first, clear the products table
    await sql`TRUNCATE TABLE products RESTART IDENTITY`;
    // insert all products
    for (const product of SAMPLE_PRODUCTS) {
      await sql`
      INSERT INTO products (name, price, image)
      VALUES (${product.name}, ${product.price}, ${product.image});
    `;
    }
    console.log("Database seeded with sample products.");
    process.exit(0); // Exit the process successfully
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // Exit the process with an error code
  }
}

seedDatabase();
