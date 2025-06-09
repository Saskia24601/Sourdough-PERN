import { create } from "zustand";

import React from "react";

import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  //form
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => {
    set({ formData });
  },
  resetForm: () => {
    set({ formData: { name: "", price: "", image: "" } });
  },

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully!");

      // Close the modal
      document.getElementById("addProductModal").close();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (error) {
      if (error.status == 429) {
        set({
          error: "Too many requests. Please try again later.",
          products: [],
        });
      } else
        set({
          error: "Failed to fetch products. Please try again later.",
          products: [],
        });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
    } catch (error) {
      console.log("Error deleting product:", error);
      toast.error("Something went wrong while deleting the product.");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data, // Populate formData with fetched product data
        error: null,
      });
    } catch (error) {
      console.log("Error fetching product:", error);
      set({ error: "Something went wrong", currentProduct: null });
      toast.error("Failed to fetch product. Please try again.");
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id, updatedData) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(
        `${BASE_URL}/api/products/${id}`,
        formData
      );
      set({ currentProduct: response.data.data });
      toast.success("Product updated successfully!");
    } catch (error) {
      console.log("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      set({ loading: false });
    }
  },
}));
